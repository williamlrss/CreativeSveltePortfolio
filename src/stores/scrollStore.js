import { writable } from 'svelte/store';

function createScrollStore() {
	const { subscribe, set } = writable({ directionY: 'down', directionX: 'right', scrollY: 0, scrollX: 0 });

	let lastScrollY = 0;
	let targetScrollY = 0;
	let lastScrollX = 0;
	let targetScrollX = 0;
	let animationFrameId = null;

	function updateStore() {
		const newScrollY = lastScrollY + (targetScrollY - lastScrollY) * 0.2; // Linear interpolation factor (easing)
		const newScrollX = lastScrollX + (targetScrollX - lastScrollX) * 0.2;

		set({
			directionY: targetScrollY > lastScrollY ? 'down' : 'up',
			directionX: targetScrollX > lastScrollX ? 'right' : 'left',
			scrollY: newScrollY,
			scrollX: newScrollX,
		});
		lastScrollY = newScrollY;
		lastScrollX = newScrollX;

		if (Math.abs(targetScrollY - newScrollY) > 1 || Math.abs(targetScrollX - newScrollX) > 1) {
			animationFrameId = requestAnimationFrame(updateStore);
		} else {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}
	}

	function updateScroll() {
		targetScrollY = window.scrollY;
		targetScrollX = window.scrollX;

		if (!animationFrameId) animationFrameId = requestAnimationFrame(updateStore);
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', updateScroll, { passive: true });
	}

	return {
		subscribe,
		destroy() {
			window.removeEventListener('scroll', updateScroll);
			if (animationFrameId) cancelAnimationFrame(animationFrameId);
		},
	};
}

export const scrollStore = createScrollStore();

// usage
// $: if ($scrollStore.direction === 'down') {
// Do something when scrolling down
// }

// $: if ($scrollStore.direction === 'up') {
// Do something when scrolling up
// }

// $: console.log('Scroll Y position:', $scrollStore.scrollY);
