<script>
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { isMenuActive } from '../stores/navigationStores';
	import { scrollStore } from '../stores/scrollStore';

	const textLength = tweened(1000, {
		duration: 4000,
		easing: cubicOut,
	});

	$: if ($isMenuActive) {
		textLength.set(300);
	} else {
		textLength.set(400);
	}
</script>

<svg aria-hidden="true" viewBox="0 0 200 200" class="clock" class:clock--active={$isMenuActive}>
	<path id="clock" class="clock-path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
	<text class="clock-rotating-path" style="--rotate-degrees: {$scrollStore.scrollY / -40 + 150}deg">
		<textPath style="font-display: swap;" href="#clock" stroke="none" startOffset="50%" text-anchor="middle">
			<tspan y="1" style="transform: rotate(180, 10, 0); font-size: calc(2em + 0.1vw);">Welcome to a williamlrss portfolio</tspan>
		</textPath>
	</text>
</svg>

<style lang="scss">
	.clock {
		overflow: visible;
		pointer-events: none;
		z-index: 2;
		position: fixed;
		top: -40vh;
		left: -40vh;
		width: 110vh;
		height: 110vh;
		fill: #f7e7ce;
		opacity: 0.2;
		transition:
			all 4s,
			fill 0.1s;
		will-change: transform scale;

		&--active {
			transform: translate3d(10vh, 60vh, 0);
			scale: 1.35;
			rotate: none;
			translate: none;
		}

		&-path {
			font-size: 1em;
		}

		&-rotating-path {
			transform-origin: center;
			will-change: transform;
			transform: rotate(var(--rotate-degrees));
		}
	}
</style>
