<script>
	import { isMobileStore } from '../../stores/isMobileStore';
	import { elOnScrollPos } from '../../actions/elOnScrollPos';
	import { isMenuActive } from '../../stores/menuActiveStore';
	import { onMount } from 'svelte';
	import { rotateOnMouseMove } from '../../actions/rotateOnMouseAction';
	import { scrollStore } from '../../stores/scrollStore';

	console.log();

	let h, pDl, sDl;
	const mobileH = 120;
	const desktopH = 140;
	const mobilePdl = 600;
	const desktopPdl = 300;
	const mobileSdl = 100;
	const desktopSdl = 50;

	$: if ($isMobileStore.aspectRatio) {
		h = mobileH;
		pDl = mobilePdl;
		sDl = mobileSdl;
	} else {
		h = desktopH;
		pDl = desktopPdl;
		sDl = desktopSdl;
	}

	let startedScrolling = false;

	// const scrollDown = 'let startedScrolling = false'.split('').map(letter => (letter === ' ' ? '&nbsp;' : letter));
	const helloWorld = 'Hello world'.split('').map(letter => (letter === ' ' ? '&nbsp;' : letter));
	const helloLyon = 'Hello Lyon'.split('').map(letter => (letter === ' ' ? '&nbsp;' : letter));

	onMount(() => {
		window.addEventListener('scroll', () => {
			startedScrolling = true;
		});
	});
</script>

<section class="panelOne">
	<section class="title {$isMenuActive ? 'title--inactive' : ''}">
		<h1 class="title-text">A Williamlrss project</h1>
		<p class="subtitle">Created with Svelte</p>
		<!-- <span class="scroll-down">
			{#each scrollDown as letter, index}
				<p class="scroll-down-els" style:animation-delay={startedScrolling ? `${index * 0.1}s` : '0s'} class:fade-down={startedScrolling}>
					{@html letter}
				</p>
			{/each}
		</span> -->
	</section>

	<!-- <div class="canvas" use:rotateOnMouseMove>
		<div class="canvas-display">
			<img
				class="canvas-display-drawing"
				src="/lyoncitydrawgpt.jpg"
				alt="drawing of Lyon made by AI"
				style="transform: translate3d(-{$scrollStore.scrollY / 3}px, 0, 0)"
			/>
		</div>
	</div> -->

	<section class="hello-world">
		<span class="hello-world--small">
			{#each helloLyon as letter, index}
				<p class="hello-world--small-els" use:elOnScrollPos={{ panelN: 1, panelH: h, pxDelay: pDl, onScrollDelay: `${index * sDl}`, duration: 0.1, delay: 0 }}>
					{@html letter}
				</p>
			{/each}
		</span>
		<span class="hello-world--shadow">
			<p class="hello-world--shadow-els">Hello World</p>
		</span>
	</section>
</section>

<style lang="scss">
	@import '../../scss/main.scss';

	.fade-down {
		animation: fadeDown 0.2s ease forwards;
	}

	@keyframes fadeDown {
		0% {
			opacity: 1;
			transform: translateY(0);
		}
		100% {
			opacity: 0;
			transform: translateY(200px);
		}
	}

	.panelOne {
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		width: 100vw;
		height: 150vh;

		@media (min-aspect-ratio: 1/1) {
			height: 200vh;
		}
	}

	.title {
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
		padding-top: 10%;
		opacity: 1;
		transition: all 0.5s;

		@media (min-aspect-ratio: 1/1) {
			padding-top: unset;
			justify-content: center;
		}

		&--inactive {
			opacity: 0;
		}

		&-link {
			width: auto;
			cursor: pointer;
			text-decoration: unset;
		}

		&-text {
			font-weight: 100;
			color: $primaryCl;
		}
	}

	.subtitle {
		font-size: calc(1em + 2vw);
		color: $secondaryCl;
	}

	.canvas {
		z-index: 4;
		position: absolute;
		align-self: center;
		aspect-ratio: 1;
		top: 80vh;
		margin: auto;
		width: 30%;
		padding: 2%;
		border: solid 2px $primaryCl;
		perspective: 400px;

		&-display {
			overflow: hidden;
			position: relative;
			width: 100%;
			height: 100%;
			transform: translateZ(0) rotateX(var(--Rx)) rotateY(var(--Ry));
			transition: transform 0.1s;
			transform-style: preserve-3d;
			will-change: transform;

			&-drawing {
				position: absolute;
				filter: opacity(0.7);
				height: 110%;
				bottom: 0;
				left: 0;
				transform-style: preserve-3d;
				will-change: transform;
			}
		}
	}

	// .scroll-down {
	// 	pointer-events: none;
	// 	display: flex;
	// 	justify-content: center;
	// 	width: 100%;

	// 	&-els {
	// 		font-size: 3em;
	// 	}
	// }

	.hello-world {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.hello-world--small {
		pointer-events: none;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 3;
		width: 100%;

		&-els {
			color: white;
			font-size: 5em;
		}
	}

	.hello-world--shadow {
		@extend .hello-world--small;
		position: absolute;
		bottom: 0;

		z-index: 1;

		&-els {
			font-size: $shadowFSize;
			background-image: linear-gradient(to bottom, #e6be8a, rgba(0, 0, 0, 0));
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			opacity: 0.9;
		}
	}
</style>
