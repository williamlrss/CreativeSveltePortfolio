import { myCodeItemActive, scrollBackToButtonActive } from '../stores/navigationStores';

export const scrollBackToButton = (node, items, codeItemActive, isScrollActive) => {
	const unsubscribe = myCodeItemActive.subscribe(value => {
		codeItemActive = value;
	});

	let buttons = node.querySelectorAll('.myCode__button');

	let buttonIndex,
		buttonsCount = null;
	let mutation,
		domReady,
		resized = false;

	const mo = new MutationObserver(() => {
		buttons = node.querySelectorAll('.myCode__button');

		if (buttons && buttonsCount !== buttons.length) {
			buttonsCount = buttons.length;
			if (buttons.length === 1 && buttons) {
				buttonIndex = codeItemActive;
			} else if (buttons.length === items) {
				mutation = true;
				domReady = true;
				isScrollActive = true;
				scrollBackToButtonActive.set(true);
			}
		}
	});

	let paddingTop;

	const setScroll = () => {
		paddingTop = (window.innerHeight / 100) * 20;
		if (buttonIndex || buttonIndex === 0) {
			node.scrollTo({
				top: buttons[buttonIndex].offsetTop - paddingTop,
				behavior: 'smooth',
			});
		}
	};

	const setBg = () => {
		domReady = false;
		resized = false;
		mutation = false;
		setTimeout(
			() => {
				scrollBackToButtonActive.set(false);
			},
			150 + buttonIndex * 30
		);
	};
	let resizeAnimationFrame;

	const checkIfResized = () => {
		if (domReady && codeItemActive === null && buttonIndex !== null && domReady === true) {
			if (resizeAnimationFrame) cancelAnimationFrame(resizeAnimationFrame);

			resizeAnimationFrame = requestAnimationFrame(() => {
				setScroll();
				setTimeout(() => {
					setBg();
				}, 200);
			});
		}
	};

	const roInit = () => {
		checkIfResized();
	};
	const ro = new ResizeObserver(roInit);

	if (node) {
		ro.observe(node);
		mo.observe(node, {
			childList: true,
		});
	}

	return {
		destroy() {
			if (resizeAnimationFrame) cancelAnimationFrame(resizeAnimationFrame);

			if (node) {
				mo.disconnect();
				ro.disconnect();
			}
			unsubscribe();
		},
	};
};
