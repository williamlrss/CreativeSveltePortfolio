export const webDev = (node, params) => {
	const bgColor = params.bgColor;

	const io = new IntersectionObserver(
		function (es) {
			const event = es[0];
			if (event.isIntersecting) {
				event.target.style.transform = `translate(0)`;
				event.target.style.backgroundColor = `${bgColor}`;
				setTimeout(function () {
					event.target.style.backgroundColor = `unset`;
				}, 1000);
			}
		},
		{
			root: null,
			threshold: 0,
			rootMargin: `0px 0px 0px 0px`,
		}
	);

	io.observe(node);

	return {
		destroy() {
			io.unobserve(node);
			io.disconnect();
		},
	};
};
