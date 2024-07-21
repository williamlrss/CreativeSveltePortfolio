import { isMobileStore } from '../stores/isMobileStore';

export function hoverImage(node, { src, navigationIndex }, touchSupport) {
	const unsubscribe = isMobileStore.subscribe(value => {
		touchSupport = value.touchSupport;
	});

	let hoverImage;
	let mouseX = 0;
	let mouseY = 0;
	let imageVisible = false;

	if ((src?.length ?? 0) === 0) return;
	function createImage() {
		if (navigationIndex !== null) return;

		hoverImage = document.createElement('img');
		hoverImage.src = src;
		hoverImage.alt = 'Hover Image';
		hoverImage.style.position = 'fixed';
		hoverImage.style.pointerEvents = 'none';
		hoverImage.style.width = '40vw';
		hoverImage.style.aspectRatio = '2/1';
		hoverImage.style.transition = 'opacity 0.3s, transform 0.4s';
		hoverImage.style.opacity = '0';
		hoverImage.style.transform = 'translateX(-50px)';
		hoverImage.style.zIndex = '9999';
		hoverImage.style.filter = 'blur(0.2px)';
		document.body.appendChild(hoverImage);
	}

	function handleMouseMove(event) {
		if (navigationIndex !== null || !hoverImage) return;
		mouseX = event.clientX;
		mouseY = event.clientY;
		hoverImage.style.left = `${mouseX + 10}px`;
		hoverImage.style.top = `${mouseY - 60}px`;
	}

	function handleMouseEnter() {
		if (navigationIndex !== null || !hoverImage) return;
		imageVisible = true;
		hoverImage.style.opacity = '0.8';
		hoverImage.style.transform = 'translateX(0)';
	}

	function handleMouseLeave() {
		if (navigationIndex !== null || !hoverImage) return;
		imageVisible = false;
		hoverImage.style.opacity = '0';
		hoverImage.style.transform = 'translateX(-50px)';
	}

	createImage();

	node.addEventListener('mousemove', handleMouseMove);
	node.addEventListener('mouseenter', handleMouseEnter);
	node.addEventListener('mouseleave', handleMouseLeave);

	if (navigationIndex !== null && hoverImage) {
		document.body.removeChild(hoverImage);
		hoverImage = null;
	}

	return {
		update({ navigationIndex }) {
			if ((navigationIndex !== null && hoverImage) || (touchSupport && hoverImage)) {
				document.body.removeChild(hoverImage);
				hoverImage = null;
			} else if (navigationIndex === null && !hoverImage && !touchSupport) {
				setTimeout(() => {
					createImage();
				}, 500);
			}
		},
		destroy() {
			node.removeEventListener('mousemove', handleMouseMove);
			node.removeEventListener('mouseenter', handleMouseEnter);
			node.removeEventListener('mouseleave', handleMouseLeave);
			if (hoverImage) {
				document.body.removeChild(hoverImage);
			}
			unsubscribe();
		},
	};
}
