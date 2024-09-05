let isTouching = false;
let touchTimeout;

export const preventClickOnTouchMove = e => {
	if (e.cancelable) e.preventDefault();

	if (e.type === 'touchstart') {
		isTouching = true;
		clearTimeout(touchTimeout);
	} else if (e.type === 'touchmove') {
		isTouching = true;
		clearTimeout(touchTimeout);
	} else if (e.type === 'touchend' || e.type === 'click') {
		if (!isTouching) return true;

		touchTimeout = setTimeout(() => {
			isTouching = false;
		}, 300);
	}
};
