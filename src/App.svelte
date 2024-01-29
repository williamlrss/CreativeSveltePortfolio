<script>
	import { isMenuActive } from './stores/menuActiveStore';

	import Clock from './components/Clock.svelte';
	import MenuButton from './components/MenuButton.svelte';
	import Menu from './components/Menu.svelte';

	import AppMainPanels from './components/AppMainPanels.svelte';
	import CubicBackground from './components/CubicBackground.svelte';

	$: if ($isMenuActive) document.body.classList.add('no-scroll');
	else document.body.classList.remove('no-scroll');

	const overlays = Array(10)
		.fill()
		.map((_, i) => {
			return {
				id: i,
				delay: Math.random(),
				fromRight: i % 2 === 0, // Alternate starting from left and right
				top: i * 10, // Each overlay will be positioned at a multiple of 10% of the viewport height
			};
		});
</script>

<MenuButton />
<Menu />

{#each overlays as overlay}
	<span
		class="overlay {overlay.fromRight ? 'from-right' : 'from-left'} {$isMenuActive ? 'overlay--active' : ''}"
		style="transition-delay: {overlay.delay}s; top: {overlay.top}vh;"
	></span>
{/each}

<main class="main">
	<AppMainPanels />
</main>

<Clock />
<CubicBackground />

<style lang="scss">
	.overlay {
		pointer-events: none;
		z-index: 89;
		height: 10vh;
		width: 0;
		position: fixed;
		background-color: black;
		opacity: 0;
		transition: all 1s;
	}

	.from-left {
		left: 0;
	}

	.from-right {
		right: 0;
	}

	.overlay--active {
		width: 100%;
		opacity: 1;
	}

	.main {
		position: relative;
		overflow-y: hidden;
		overflow-x: hidden;
		display: grid;
		place-items: center;
		width: 100vw;
	}
</style>
