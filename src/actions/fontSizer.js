/* Applying a font size in percentage towards the height or the width of the container
The size is adjusted in real-time using the ressourceless Observer browser API

use:fontSizer={{ h: true, p: 35 }} // height // 35% --> in px
use:fontSizer={{ p: 50 }} // width // 50%
*/

export function fontSizer(node, params = {}) {
	let { h = false, p = 5 } = params;

	const setFontSize = () => {
		const size = h ? node.offsetHeight : node.offsetWidth;
		const fontSize = (size * p) / 100;
		node.style.fontSize = `${fontSize}px`;
	};

	const resizeObserver = new ResizeObserver(e => {
		setFontSize();
	});

	resizeObserver.observe(node);
	setFontSize();

	return {
		destroy() {
			resizeObserver.unobserve(node);
		},
	};
}
