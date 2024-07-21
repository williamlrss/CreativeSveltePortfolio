export function onExitAnim(node) {
	let progress = 0;

	const ioInit = es => {
		const event = es[0];

		const r = event.intersectionRatio;
		progress = 1 - r * 100 + 100;

		if (event.boundingClientRect.y < 0 && progress > 10) {
			node.style.willChange = 'transform background-color';
			node.style.transform = `translateX(${progress / 16}%) translateY(${-progress / 8}%) rotateZ(${-progress / 16}deg)`;
			node.style.transition = 'all 0.2s';
		} else {
			node.style.willChange = 'transform background-color';
			node.style.transform = `translateY(0) rotateX(0deg)`;
			node.style.transition = 'all 0.8s';
		}
	};

	const options = {
		root: null,
		threshold: Array.from({ length: 100 }, (_, i) => i / 100),
		rootMargin: `0px 0px 0px 0px`,
	};

	let io = new IntersectionObserver(ioInit, options);

	io.observe(node);

	return {
		destroy() {
			io.unobserve(node);
			io.disconnect();
		},
	};
}
