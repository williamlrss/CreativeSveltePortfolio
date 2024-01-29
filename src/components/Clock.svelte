<script>
	import { scrollStore } from '../stores/scrollStore.js';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	import { isMenuActive } from '../stores/menuActiveStore.js';
	const textLength = tweened(1000, {
		duration: 4000,
		easing: cubicOut,
	});

	$: if ($isMenuActive) {
		textLength.set(300);
	} else {
		textLength.set(400);
	}

	// $: console.log('Scroll Y position:', $scrollStore.scrollY);

	// $: if ($scrollStore.direction === 'down') {
	// 	console.log('down');
	// }

	// $: if ($scrollStore.direction === 'up') {
	// 	console.log('up');
	// }
</script>

<svg viewBox="0 0 200 200" class="clock {$isMenuActive ? 'active' : ''}" aria-labelledby="link1-title link1-desc">
	<title id="link1-title">Rotating Clock</title>
	<desc id="link1-desc">A large text displayed as a rotating clock in the background</desc>

	<path id="link-circle" class="link__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
	<text class="clock-rotating-path" style="--rotate-degrees: {$scrollStore.scrollY / 10}deg">
		<textPath href="#link-circle" stroke="none"> <tspan textLength={$textLength}>Welcome to a William's P O R T F O L I O</tspan></textPath>
	</text>
</svg>

<style lang="scss">
	// | | | | | | | | | | | | | | | | | | | | | | | |
	.clock {
		pointer-events: none;
		z-index: 2;
		position: fixed;
		top: -40vh;
		left: -40vh;
		width: 110vh;
		height: 110vh;
		fill: #f7e7ce;
		opacity: 0.2;
		transition: 4s;

		// @media (min-aspect-ratio: 1/1) {
		// 	top: -200vh;
		// 	width: 300vh;
		// 	height: 300vh;
		// }

		&-rotating-path {
			transform-origin: center;
			transform: rotate(var(--rotate-degrees));
			transition: transform 0.3s ease-out;
		}
	}

	.active {
		top: 20vh;
		left: -50vh;
		width: 150vh;
		height: 150vh;
		transition: 4s;
	}
</style>
