<script>
	import { onMount, onDestroy } from 'svelte';
	import { isEndReached, outroProgress } from '../../stores/isEndReached';
	import { debounce } from '../../scripts/debounce';
	import { memoize } from '../../scripts/memoize';

	let nodeOutro;
	let io;
	let progress = 0;

	const ioInit = es => {
		const event = es[0];
		let r = event.intersectionRatio * 100;
		progress = r;
	};

	$: $outroProgress = progress;

	$: if (progress > 90) {
		$isEndReached = true;
		setTimeout(() => {
			$isEndReached = false;
		}, 1200);
	}

	const options = {
		root: nodeOutro,
		threshold: Array.from({ length: 100 }, (_, i) => i / 100),
		rootMargin: `${window.innerHeight}px 0px 0px 0px`,
	};

	const onResize = () => {
		io.disconnect();
		options.rootMargin = `${window.innerHeight}px 0px 0px 0px`;
		io = new IntersectionObserver(ioInit, options);
		io.observe(nodeOutro);
	};

	const onResizeDebounce = debounce(onResize, 50);

	const roInit = () => {
		onResizeDebounce();
	};

	const ro = new ResizeObserver(roInit);

	onMount(() => {
		if (nodeOutro) {
			options.rootMargin = `${window.innerHeight}px 0px 0px 0px`;
			ro.observe(nodeOutro);
			io = new IntersectionObserver(ioInit, options);
			io.observe(nodeOutro);
		}
	});

	onDestroy(() => {
		if (nodeOutro) {
			progress = 0;
			ro.disconnect();
			io.unobserve(nodeOutro);
			io.disconnect();
		}
	});

	let txtOutro;
	let txt = `————________————________ ————________————________ ————________————________ ————________————________ ————________————________ ————________————________`;

	let totalCharFr = txt.replace(/\s+/g, '').length;

	let globalIndexFr = 0;
	let wordsWithLetters = txt.split(' ').map(word => word.split('').map(letter => ({ letter, index: globalIndexFr++ })));

	const calculateRotation = memoize((index, totalChar, progress) => {
		const section = (100 / totalChar) * 1.2;
		const start = index * section;
		let charProgress = ((progress - start) / section) * 100;
		charProgress = Math.max(0, Math.min(charProgress, 100));

		let startReverse = (index + 10) * section;
		let charProgressReverse = 100 - ((progress - startReverse) / section) * 100;
		charProgressReverse = Math.max(-100, Math.min(charProgressReverse, 100));

		let opacity = progress < startReverse ? charProgress / 100 : charProgressReverse / 100;
		let scale = progress < startReverse ? charProgress : charProgressReverse;
		let rotation = progress < startReverse ? 0.25 - (charProgress / 100) * 0.25 : 0.25 - (charProgressReverse / 100) * 0.25;

		return {
			opacity: progress > 90 ? 0 : opacity,
			scale: progress > 90 ? 0 : scale,
			rotation: progress > 90 ? 0 : rotation,
		};
	});

	$: if ($isEndReached) document.body.classList.add('no-scroll');
	else document.body.classList.remove('no-scroll');

	const overlays = Array(10)
		.fill()
		.map((_, i) => {
			return {
				id: i,
				delay: Math.random() * 0.3,
				fromRight: i % 2 === 0,
				top: i * 10,
			};
		});
</script>

<div class="outro" style="opacity: 1;" bind:this={nodeOutro}>
	<div class="outro__door--top" style="transform-origin: left; transform: scaleX(50%)"></div>
	<div class="outro__door--bottom" style="transform-origin: right; transform: scaleX(50%)"></div>

	<div style="position: absolute; writing-mode: vertical-rl;" bind:this={txtOutro}>
		<p aria-hidden="true" class="outro__txt">
			{#each wordsWithLetters as word}
				<span style="display: flex; flex-wrap: wrap; position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);">
					{#each word as { letter, index }}
						{@const rotationData = calculateRotation(index, totalCharFr, progress)}
						<div
							style="will-change: transform opacity;
                        transition: all 0.2s; white-space: pre; transform-origin: 50% 75%; opacity: {rotationData.opacity}; transform: scale(100%, {rotationData.scale}%); rotate3d(1, 0, 0, {rotationData.rotation}turn);"
						>
							{letter}
						</div>
					{/each}
				</span>
			{/each}
		</p>
		<p class="aria-hidden">I value empathy, respect, dedication. I am open to work. Hire me now</p>
	</div>
</div>

{#each overlays as overlay}
	<span
		class="overlay {overlay.fromRight ? 'from-right' : 'from-left'} {$isEndReached ? 'overlay--active' : ''}"
		style="transition-delay: {overlay.delay}s; top: {overlay.top}vh; transform-origin: {overlay.fromRight ? 'right' : 'left'}"
	></span>
{/each}

<style lang="scss">
	@import '../../scss/main.scss';

	.aria-hidden {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		overflow: hidden !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		white-space: nowrap !important;
	}

	.outro {
		position: relative;
		width: 100%;
		height: 200vh;

		&__txt {
			pointer-events: none;
			font-size: 20vw;
			color: #f7e7ce;
			font-weight: 100;

			@media (min-aspect-ratio: 1/1) {
				font-size: 8vw;
			}
		}

		&__door {
			&--top {
				position: absolute;
				background-color: #f7e7ce;
				width: 40%;
				height: 44%;
				clip-path: polygon(27% 0, 73% 0, 73% 100%, 27% 100%);
				top: 0;
				left: 55%;
				transform: translate(-45%);
			}

			&--bottom {
				position: absolute;
				background-color: #f7e7ce;
				width: 40%;
				height: 54%;
				clip-path: polygon(37% 0, 83% 0, 90% 100%, 30% 100%);
				bottom: 0;
				left: 55%;
				transform: translate(-55%);
			}
		}
	}

	.overlay {
		pointer-events: none;
		z-index: 89;
		height: 10.5vh;
		width: 100%;
		position: fixed;
		background-color: black;
		opacity: 0;
		will-change: transform;
		transform: scaleX(0);
		transition:
			transform 0.6s,
			opacity 0.3s;
	}

	.from-left {
		left: 0;
	}

	.from-right {
		right: 0;
	}

	.overlay--active {
		opacity: 1;
		transform: scaleX(1);
	}
</style>
