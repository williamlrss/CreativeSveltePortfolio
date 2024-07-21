<script>
	import { onMount, onDestroy } from 'svelte';
	import { debounce } from './scripts/debounce';
	import { throttle } from './scripts/throttle';
	import { isMobileStore } from './stores/isMobileStore';
	import { scrollStore } from './stores/scrollStore';

	import MenuOverlay from './components/MenuOverlay.svelte';
	import Clock from './components/Clock.svelte';
	import MenuButton from './components/MenuButton.svelte';
	import MenuButtonMobile from './components/menuButtonMobile.svelte';
	import Menu from './components/Menu.svelte';
	// import Spotify from './components/Spotify.svelte';
	import AppMainPanels from './components/AppMainPanels.svelte';
	import CubicBackground from './components/CubicBackground.svelte';

	import { isMenuActive } from './stores/navigationStores';
	import { isEndReached } from './stores/isEndReached';

	let progress = 0;
	$: progress = Math.min(Math.max(0, ($scrollStore.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100), 100);
	$: progressPercentInt = Math.round(progress);

	let targetScrollY = 0;
	let currentScrollY = 0;
	let rafId = null;
	let lastTouchY = 0;

	const linearTween = (t, b, c, d) => (c * t) / d + b;

	const handleTouchStart = e => {
		if (!$isMenuActive) {
			lastTouchY = e.touches[0].clientY;
			e.preventDefault();
		}
	};

	const handleTouchMove = e => {
		if (!$isMenuActive) {
			const touchY = e.touches[0].clientY;
			const deltaY = lastTouchY - touchY;
			lastTouchY = touchY;

			targetScrollY += deltaY * 3;
			targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

			if (!rafId) {
				throttledUpdateScroll();
			}
			e.preventDefault();
		}
	};

	const handleWheel = e => {
		if (!$isMenuActive) {
			e.preventDefault();

			targetScrollY += e.deltaY;
			targetScrollY = Math.max(0, Math.min(targetScrollY, document.body.scrollHeight - window.innerHeight));

			if (!rafId) {
				throttledUpdateScroll();
			}
		}
	};

	const throttledUpdateScroll = throttle(
		() => {
			rafId = requestAnimationFrame(updateScroll);
		},
		$isMobileStore.aspectRatio ? 200 : 300
	);

	const updateScroll = () => {
		if ($isEndReached) {
			setTimeout(() => {
				window.scrollTo(0, { top: 0 });
				targetScrollY = 0;
				currentScrollY = 0;
				rafId = null;
				lastTouchY = 0;
				return;
			}, 800);
		}

		currentScrollY = linearTween(0.05, currentScrollY, targetScrollY - currentScrollY, 1);

		window.scrollTo(0, currentScrollY);

		if (Math.abs(targetScrollY - currentScrollY) < 1) {
			cancelAnimationFrame(rafId);
			rafId = null;
		} else {
			rafId = requestAnimationFrame(updateScroll);
		}
	};

	const handleManualScrollbarUpdate = () => {
		if (!$isMenuActive) {
			const actualScrollY = window.scrollY;
			if (Math.abs(actualScrollY - currentScrollY) > 10) {
				targetScrollY = actualScrollY;
				currentScrollY = actualScrollY;
				if (!rafId) {
					rafId = requestAnimationFrame(updateScroll);
				}
			}
		}
	};

	onMount(() => {
		// Handling manual scrollbar movements
		window.addEventListener('scroll', debounce(handleManualScrollbarUpdate, 150));
		window.addEventListener('wheel', handleWheel, { passive: false });
		window.addEventListener('touchstart', handleTouchStart, { passive: false });
		window.addEventListener('touchmove', handleTouchMove, { passive: false });

		if (!$isMenuActive) document.body.style.overflow = 'hidden';
		else if ($isMenuActive && rafId) cancelAnimationFrame(rafId);
	});

	onDestroy(() => {
		window.removeEventListener('scroll', debounce(handleManualScrollbarUpdate, 150));
		window.removeEventListener('wheel', handleWheel, { passive: false });
		window.removeEventListener('touchstart', handleTouchStart, { passive: false });
		window.removeEventListener('touchmove', handleTouchMove, { passive: false });
	});
</script>

{#if !$isMobileStore.aspectRatio}
	<MenuButton />
{/if}

<Menu />

{#if !$isMobileStore.aspectRatio}
	<MenuOverlay />
{/if}

<!-- <Spotify /> -->

<span class="scrollbar--before" style="transform: translateY({progress}vh);">
	{#if !isNaN(progress) && progressPercentInt >= 10}
		{progressPercentInt}%
	{/if}
</span>

<main class="main">
	<AppMainPanels />
	{#if $isMobileStore.aspectRatio}
		<MenuButtonMobile />
	{/if}
</main>

<Clock />

{#if !$isMobileStore.aspectRatio}
	<CubicBackground />
{/if}

<style lang="scss">
	.scrollbar--before {
		z-index: 1;
		position: fixed;
		font-size: 1.5em;
		top: 0;
		right: 1vw;
		color: #f7e7ce;
	}
</style>
