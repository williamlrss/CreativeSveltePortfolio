import { isMobileStore } from '../stores/isMobileStore';
import { onDestroy } from 'svelte';

export function rotateOnMouseMove(node) {
	let rx = 0; // Rotation around X-axis
	let ry = 0; // Rotation around Y-axis
	const maxRotation = 10; // Maximum rotation in degrees
	const slowFactor = 15; // Increase this factor to slow down the rotation speed

	let isMobile = false;
	const unsubscribe = isMobileStore.subscribe($isMobileStore => {
		isMobile = $isMobileStore.touchSupport;
	});

	function handleMouseMove(event) {
		if (isMobile) {
			return;
		}

		const { width, height, left, top } = node.getBoundingClientRect();
		const centerX = left + width / 2;
		const centerY = top + height / 2;
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		// Calculate distance from the center of the element as a proportion of a larger area
		const proportionalDistanceX = (mouseX - centerX) / ((width * slowFactor) / 2);
		const proportionalDistanceY = (mouseY - centerY) / ((height * slowFactor) / 2);

		// Map the proportional distance to the rotation range
		rx = -proportionalDistanceY * maxRotation; // Negating rx for correct up/down rotation
		ry = proportionalDistanceX * maxRotation;

		// Ensure rotation is within the range [-maxRotation, maxRotation]
		rx = Math.max(-maxRotation, Math.min(maxRotation, rx));
		ry = Math.max(-maxRotation, Math.min(maxRotation, ry));

		node.style.setProperty('--Rx', `${rx}deg`);
		node.style.setProperty('--Ry', `${ry}deg`);
	}

	window.addEventListener('mousemove', handleMouseMove);

	const resetAndStop = () => {
		if (isMobile) {
			node.style.setProperty('--Rx', '0');
			node.style.setProperty('--Ry', '0');
		}
	};

	const debounce = (callback, delay) => {
		let timer;
		return function () {
			clearTimeout(timer);
			timer = setTimeout(() => {
				callback();
			}, delay);
		};
	};

	window.addEventListener('resize', debounce(resetAndStop, 200));

	onDestroy(() => {
		unsubscribe();
	});

	return {
		destroy() {
			window.removeEventListener('mousemove', handleMouseMove);
		},
	};
}

/* Example of how to use it:

<div class="rotate">
    <div class="rotate__el" use:rotateOnMouseMove></div>
</div>

.rotate {
    border: 2px solid red;
    width: 200px;               // necessary
    height: 200px;              // necessary
    perspective: 400px;         // necessary
}

.rotate__el {
    background-color: blue;
    width: 100%;
    height: 100%;
    transform: rotateX(var(--Rx)) rotateY(var(--Ry));   // necessary
    transition: transform 0.3s ease-out;                // necessary
}

*/
