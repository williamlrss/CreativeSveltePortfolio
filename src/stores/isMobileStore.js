import { readable } from 'svelte/store';

/* This Store provide two boolean variables across the app
    - aspectRatio: true if the aspect ratio is less than 1/1
        --> transmitting responsiveness knowledge to JS functions and other display

    - touchSupport: true if the device support touch events
        --> desable ressourceful JS functions for mostly tablet and mobile devices
*/

function isMobile() {
	const checkAspectRatio = () => {
		const mediaQueryList = window.matchMedia('(min-aspect-ratio: 1/1)');
		return !mediaQueryList.matches;
	};

	const checkTouchSupport = () => {
		return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
	};

	function debounce(callback, delay) {
		let timer;
		return function () {
			clearTimeout(timer);
			timer = setTimeout(() => {
				callback();
			}, delay);
		};
	}

	const store = readable({ aspectRatio: checkAspectRatio(), touchSupport: checkTouchSupport() }, set => {
		const mediaQueryList = window.matchMedia('(min-aspect-ratio: 1/1)'); // necessary (scope)

		const update = () => {
			set({ aspectRatio: checkAspectRatio(), touchSupport: checkTouchSupport() });
		};

		const debouncedUpdate = debounce(update, 300);

		mediaQueryList.addEventListener('change', update);
		window.addEventListener('resize', debouncedUpdate);

		return () => {
			mediaQueryList.removeEventListener('change', update);
			window.removeEventListener('resize', debouncedUpdate);
		};
	});

	return store;
}

export const isMobileStore = isMobile();
