import { writable } from 'svelte/store';

function createScrollStore() {
	const { subscribe, set } = writable({ direction: 'down', scrollY: 0 });

	let lastScrollY = 0;
	let targetScrollY = 0;
	let animationFrameId = null;

	function updateStore() {
		const newScrollY = lastScrollY + (targetScrollY - lastScrollY) * 0.2; // Linear interpolation factor (0.1)

		set({ direction: targetScrollY > lastScrollY ? 'down' : 'up', scrollY: newScrollY });
		lastScrollY = newScrollY;

		if (Math.abs(targetScrollY - newScrollY) > 1) {
			animationFrameId = requestAnimationFrame(updateStore);
		} else {
			animationFrameId = null;
		}
	}

	function updateScroll() {
		targetScrollY = window.scrollY;

		if (!animationFrameId) {
			animationFrameId = requestAnimationFrame(updateStore);
		}
	}

	if (typeof window !== 'undefined') {
		window.addEventListener('scroll', updateScroll);
	}

	return { subscribe };
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
