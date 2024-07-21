<script>
	import { onMount, onDestroy } from 'svelte';
	import { scrollStore } from '../../stores/scrollStore';
	import { isMobileStore } from '../../stores/isMobileStore';
	import { memoize } from '../../scripts/memoize';
	import { debounce } from '../../scripts/debounce';

	// NODE EL
	let container;
	let containerHeight = '0px';

	let io;
	let progress = 0;

	const ioInit = es => {
		if (container.getBoundingClientRect().bottom <= 0) {
			progress = 0;
			return;
		}
		const event = es[0];
		const r = event.intersectionRatio;
		progress = r * 100;
	};

	const options = {
		root: null,
		threshold: Array.from({ length: 100 }, (_, i) => i / 100),
		rootMargin: `${containerHeight} 0px -${window.innerHeight}px 0px`,
	};

	const onResize = e => {
		containerHeight = e.contentRect.height + 'px';
		io.disconnect();
		options.rootMargin = `${containerHeight} 0px -${window.innerHeight}px 0px`;
		io = new IntersectionObserver(ioInit, options);
		io.observe(container);
	};

	const onResizeDebounce = debounce(onResize, 50);

	const roInit = es => {
		const e = es[0];
		onResizeDebounce(e);
	};

	const ro = new ResizeObserver(roInit);

	onMount(() => {
		if (container) {
			containerHeight = `${container.getBoundingClientRect().height}px`;
			options.rootMargin = `${containerHeight} 0px -${window.innerHeight}px 0px`;
			ro.observe(container);
			io = new IntersectionObserver(ioInit, options);
			io.observe(container);
		}
	});

	onDestroy(() => {
		if (container) {
			progress = 0;
			ro.disconnect();
			io.unobserve(container);
			io.disconnect();
		}
	});

	let txt = `Are\u200Byou\u200Blooking for\u200Bthe\u200Bbest Candidate?? ....\u200B..\u200B._.\u200B.\u200B\u200B__\u200B. \u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B\u200B`;

	let totalCharFr = txt.replace(/\s+/g, '').length;

	let globalIndexFr = 0;
	let wordsWithLetters = txt.split(' ').map(word => word.split('').map(letter => ({ letter, index: globalIndexFr++ })));

	const calculateRotation = memoize((index, totalChar, progress) => {
		const section = (100 / totalChar) * 0.95;
		const start = index * section;
		let charProgress = ((progress - start) / section) * 100;
		charProgress = Math.max(0, Math.min(charProgress, 100));

		let startReverse = (index + 10) * section;
		let charProgressReverse = 100 - ((progress - startReverse) / section) * 100;
		charProgressReverse = Math.max(-100, Math.min(charProgressReverse, 100));

		let opacity = progress < startReverse ? charProgress / 100 : charProgressReverse / 100;
		let scaleX = progress < startReverse ? charProgress : charProgressReverse;
		let scaleY = progress < startReverse ? charProgress : charProgressReverse;
		scaleX = $scrollStore.directionY === 'up' ? scaleX : scaleX;
		scaleY = $scrollStore.directionY === 'up' ? 100 : scaleY;
		let rotation = progress < startReverse ? 0.25 - (charProgress / 100) * 0.25 : 0.25 - (charProgressReverse / 100) * 0.25;

		return {
			opacity: progress === 100 ? 0 : opacity,
			scaleX: progress === 100 ? 0 : scaleX,
			scaleY: progress === 100 ? 0 : scaleY,
			rotation: progress === 100 ? 0 : rotation,
		};
	});
</script>

<div class="textOnScroll" bind:this={container}>
	<p aria-hidden="true" class="textOnScroll__txt">
		{#each wordsWithLetters as word}
			<span style="width: 100%; display: flex; justify-content: center; flex-wrap: wrap; position: fixed;">
				{#each word as { letter, index }}
					{@const rotationData = calculateRotation(index, totalCharFr, progress)}
					<div
						style="background-color: black; padding: {$isMobileStore ? '1vw' : '0.5vw'}; z-index: 1; will-change: transform opacity;
                        transition: all 0.3s ease-out; white-space: pre; transform-origin: {$scrollStore.directionY === 'up'
							? 75
							: 75}% {$scrollStore.directionY === 'up'
							? 50
							: 75}%; opacity: {rotationData.opacity}; transform: scale({rotationData.scaleX}%, {rotationData.scaleY}%); rotate3d(0, 1, 0, {rotationData.rotation}turn);"
					>
						{letter === '\u200B' ? ' ' : letter}
					</div>
				{/each}
			</span>
		{/each}
	</p>
	<p class="aria-hidden">Are you looking for the best candidate?</p>
</div>

<style lang="scss">
	.aria-hidden {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		overflow: hidden !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		white-space: nowrap !important;
	}

	.textOnScroll {
		height: 400vh;

		@media (min-aspect-ratio: 1/1) {
			height: 500vh;
		}

		&__txt {
			width: 100%;
			position: absolute;
			font-size: 9vw;
			color: #f7e7ce;
			font-weight: 400;

			& > span {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
			}
		}

		&__txt * {
			pointer-events: none;
		}
	}
</style>
