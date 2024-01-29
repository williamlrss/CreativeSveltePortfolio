import { scrollStore } from './stores/scrollStore'; // Import the scroll store

export function smarterMobileScrolling(node) {
	let startY, scrollStartY;
	let moving = false;

	let currentScrollY;

	const unsubscribe = scrollStore.subscribe(value => {
		currentScrollY = value.scrollY;
	});

	function touchStartHandler(e) {
		if (scrollStore.scrollY != undefined) {
			startY = e.touches[0].clientY;
			scrollStartY = currentScrollY; // Use scrollY from scrollStore
			moving = true;
		}
	}

	function touchMoveHandler(e) {
		if (!moving) return;
		e.preventDefault();

		const touchY = e.touches[0].clientY;
		const touchMoveDiff = startY - touchY;

		// Update the scroll position using the scrollStore
		scrollStore.updateScrollPosition(scrollStartY + touchMoveDiff);
	}

	function touchEndHandler() {
		moving = false;
		// Any necessary cleanup or final adjustments can be done here
	}

	node.addEventListener('touchstart', touchStartHandler, { passive: false });
	node.addEventListener('touchmove', touchMoveHandler, { passive: false });
	node.addEventListener('touchend', touchEndHandler, { passive: false });

	return {
		destroy() {
			unsubscribe();
			node.removeEventListener('touchstart', touchStartHandler);
			node.removeEventListener('touchmove', touchMoveHandler);
			node.removeEventListener('touchend', touchEndHandler);
		},
	};
}
