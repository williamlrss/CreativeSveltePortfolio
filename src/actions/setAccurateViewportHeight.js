export function setAccurateViewportHeight(node) {
	function debounce(func, wait) {
		let timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(func, wait);
		};
	}

	function setAccurateViewportHeight() {
		let vh = window.innerHeight * 0.01; // Exclude outerHeight --> mobile device browser extra height
		node.style.setProperty('--vh', `${vh}px`);
	}

	window.addEventListener('resize', setAccurateViewportHeight);
	setAccurateViewportHeight();
	return {
		destroy() {
			window.removeEventListener('resize', setAccurateViewportHeight);
		},
	};
}
