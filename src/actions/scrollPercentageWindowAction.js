export function scrollPercentage(node, callback) {
	const updateScrollPercentage = () => {
		const elementRect = node.getBoundingClientRect();
		const elementPosition = elementRect.top + window.scrollY;
		const elementHeight = elementRect.height;
		const viewportHeight = window.innerHeight;

		// Calculate the scroll position when the element is fully in view
		const startScroll = elementPosition - viewportHeight;
		const endScroll = elementPosition + elementHeight;

		// Current scroll position
		const currentScrollPosition = window.scrollY;

		// Calculate the percentage of the element's visibility in the viewport
		let percentage;
		if (currentScrollPosition < startScroll) {
			percentage = 0;
		} else if (currentScrollPosition > endScroll) {
			percentage = 100;
		} else {
			percentage = ((currentScrollPosition - startScroll) / (endScroll - startScroll)) * 100;
		}

		// Convert the result to a number with two decimal places
		callback(parseFloat(percentage.toFixed(2)));
	};

	window.addEventListener('scroll', updateScrollPercentage);

	return {
		destroy() {
			window.removeEventListener('scroll', updateScrollPercentage);
		},
	};
}
