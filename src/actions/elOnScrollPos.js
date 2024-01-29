import { isMobileStore } from '../stores/isMobileStore';

/*
This function (action) allows any element to be translated in real-time at the scroll position, ensuring:
  - No matter its position in the whole page
  - No matter its type
  - No matter its size

The goal is NOT to change the X positioning of any element. We keep the same original 'design' and just display the content AS IT IS while the user scrolls.

How to use it:
Import { elOnScrollPos } from '~/src/actions/elOnScrollPos';

use:elOnScrollPos={{
    panelN: 1,           // Which section, in case each panel is the same size
    panelH: 200,         // Range in vh (size of each panel)
    pxDelay: 100,        // Change element position based on its original positioning (can be negative)
    onScrollDelay: 0,    // Start the onScroll effect earlier or later (can be negative)
    duration: 0.2,       // Animation duration
    delay: 0,            // Animation delay
}};
*/

export function elOnScrollPos(node, params) {
	let getP; // calculated on load - position of the element
	let lockValue = false; // set to true when getP isn't undefined or not a number
	let p = 0; // position of the element set if lockValue is true
	let h = node.offsetHeight / 2; // center of height of the element
	let tlY = 0; // translation value applied to the element

	let d = params.duration;
	let dl = params.delay;
	let pxDl = params.pxDelay;

	let frameId = null;

	// REF 1
	// [start, end] = getRange(params.panelN, params.panelH);
	function getRange(n, vh) {
		let h = window.innerHeight * (vh / 100);
		let start = h * (n - 1);
		let end = h * n - pxDl;
		return [start, end];
	}

	let start, end;

	// ON LOAD ELEMENT POSITION
	// -- Value lock is here to prevent any recalculation
	// -- without condition statement: getP == undefined || isNaN(getP)
	let calculatePos = () => {
		if (node && !lockValue && document.readyState === 'complete') {
			getP = node.getBoundingClientRect().top + window.scrollY;
			[start, end] = getRange(params.panelN, params.panelH); // REF 1

			if (getP != undefined && !isNaN(getP) && start != undefined && end != undefined) {
				p = getP;
				start += params.onScrollDelay;
				lockValue = true;
			}
		}
	};

	// RESET AND RECALCULATE POSITION ON WINDOW RESIZE, BLUR, VISIBILITYCHANGE, ORIENTATIONCHANGE.
	let resetAndRecalculate = () => {
		cancelAnimationFrame(frameId);
		node.style.transform = 'none';
		node.style.transition = 'none';
		lockValue = false;
		calculatePos();
		frameId = null;
	};

	// let isMobile;
	// const unsubscribe = isMobileStore.touchSupport.subscribe(value => {
	// 	isMobile = value;
	// });

	window.addEventListener('resize', () => {
		// if (isMobileStore.touchSupport == false) {
		// some mobile browser 'menu and navigation' open on scroll down and close on scroll up
		// which would implies a recalculation, listener on 'resize' would therefore provide a bad experience for mobile devices
		resetAndRecalculate();
		// }
	});

	window.addEventListener('blur', () => {
		resetAndRecalculate();
	});
	document.addEventListener('visibilitychange', () => {
		resetAndRecalculate();
	});
	window.addEventListener('orientationchange', () => {
		resetAndRecalculate();
	});

	// MAIN FUNCTION
	let scrollListener = () => {
		let scrollY = window.scrollY;
		tlY = scrollY + h - p + pxDl;

		if (scrollY > start && scrollY < end) {
			node.style.transform = `translate3d(0, ${tlY}px, 0)`;
			node.style.transition = `transform ${d}s ${dl}s`;
			// node.style.transition = 'opacity 0.5s';
			// node.style.opacity = '1';
		} else {
			node.style.transform = `translateY(0px)`;
			node.style.transition = `transform 2s ease-out`;
			// node.style.opacity = '0.25';
			// node.style.transition = 'opacity 0.1s';
		}

		cancelAnimationFrame(frameId);
	};

	let onScroll = () => {
		if (lockValue) {
			requestAnimationFrame(scrollListener);
		}
	};

	window.addEventListener('load', () => {
		calculatePos();
	});
	window.addEventListener('scroll', () => {
		onScroll();
	});

	return {
		destroy() {
			cancelAnimationFrame(scrollListener);

			window.removeEventListener('load', calculatePos);
			window.removeEventListener('scroll', onScroll);
			unsubscribe();
		},
	};
}
