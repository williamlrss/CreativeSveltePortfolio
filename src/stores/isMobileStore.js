import { readable } from 'svelte/store';

function isMobile() {
	const checkAspectRatio = () => {
		const mediaQueryList = window.matchMedia('(min-aspect-ratio: 1/1)');
		return !mediaQueryList.matches;
	};

	const checkTouchSupport = () => {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	};

	const store = readable({ aspectRatio: checkAspectRatio(), touchSupport: checkTouchSupport() }, set => {
		const update = () => {
			set({ aspectRatio: checkAspectRatio(), touchSupport: checkTouchSupport() });
		};

		window.addEventListener('resize', update);
		window.addEventListener('mouseDown', update);

		return () => {
			window.removeEventListener('resize', update);
			window.removeEventListener('mouseDown', update);
		};
	});

	return store;
}

export const isMobileStore = isMobile();
