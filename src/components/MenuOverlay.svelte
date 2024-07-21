<script>
	import { isMenuActive } from '../stores/navigationStores';

	$: if ($isMenuActive) document.body.classList.add('no-scroll');
	else document.body.classList.remove('no-scroll');

	const overlays = Array(10)
		.fill()
		.map((_, i) => {
			return {
				id: i,
				delay: Math.random() * 0.3,
				fromRight: i % 2 === 0, // Alternate starting from left and right
				top: i * 10, // Each overlay will be positioned at a multiple of 10% of the viewport height
			};
		});
</script>

{#each overlays as overlay}
	<span
		class="overlay {overlay.fromRight ? 'from-right' : 'from-left'} {$isMenuActive ? 'overlay--active' : ''}"
		style="transition-delay: {overlay.delay}s; top: {overlay.top}vh; transform-origin: {overlay.fromRight ? 'right' : 'left'}"
	></span>
{/each}

<style>
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
			transform 0.8s,
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
