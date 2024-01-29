<script>
	import { isMenuActive } from '../stores/menuActiveStore';
	import { scrollStore } from '../stores/scrollStore';
	import { rotateOnMouseMove } from '../actions/rotateOnMouseAction';
	import { isMobileStore } from '../stores/isMobileStore';

	// import { onMount, tick } from 'svelte';

	let title = 'Scroll Down :)';
	let scrollY = 0;
	let currentTitle = title; // Displayed title
	let animating = false; // Animation state

	let h = window.innerHeight * (150 / 100);
	let x = 30;

	$: if ($isMobileStore.aspectRatio) {
		h = window.innerHeight * (150 / 100);
		x = 3000;
	} else {
		h = window.innerHeight * (400 / 100);
		x = 40;
	}

	// Title definitions
	const titles = [
		{ range: [0, h - x], title: '' },
		{ range: [h - x + 1, h * 2 - x], title: 'use:elOnScrollPos' },
		{ range: [h * 2 - x + 1, h * 3 - x], title: '$scrollStore.scrollY' },
		{ range: [h * 3 - x + 1, h * 4 - x], title: 'observer.observe(element)' },
		{ range: [h * 4 - x + 1, h * 5 - x], title: '$isMobileStore' },
		{ range: [h * 5 - x + 1, h * 6 - x], title: 'rotateOnMouseMove' },
	];

	// Reactive statement to update the scroll position
	$: scrollY = $scrollStore.scrollY;

	$: {
		if (!isNaN(x)) {
			const found = titles.find(({ range }) => scrollY >= range[0] && scrollY <= range[1]);
			if (found && found.title !== currentTitle) {
				animateTitleChange(found.title);
			}
		}
	}

	async function animateTitleChange(newTitle) {
		if (animating || !titleElement) return; // Guard clause
		animating = true;

		// Fade out and increase letter spacing
		titleElement.style.opacity = '0';
		titleElement.style.letterSpacing = '5px';

		// Wait for fade-out
		await new Promise(r => setTimeout(r, 500));

		currentTitle = newTitle;
		titleElement.style.opacity = '1';
		titleElement.style.letterSpacing = 'normal';

		// Wait for fade-in
		await new Promise(r => setTimeout(r, 500));

		animating = false;
	}

	let titleElement;
</script>

<div class="title-container {$isMenuActive ? 'title-container--inactive' : ''}">
	<p class="title" use:rotateOnMouseMove bind:this={titleElement}>{currentTitle}</p>
</div>

<style lang="scss">
	.title-container {
		position: absolute;
		left: 30%;
		bottom: 5%;
		width: auto;
		height: auto;
		perspective: 100px;
		opacity: 1;
		transition: opacity 0.3s 0.3s;

		&--inactive {
			opacity: 0;
		}
	}

	.title {
		transform: rotate3d(1, 0, 0, var(--Rx)) rotate3d(0, 1, 0, var(--Ry));

		// transform: rotate3d(var(--Rx), var(--Ry), 1, 1, 1);
		transition: transform 0.3s ease-out;
		text-align: center;
		opacity: 1;
		letter-spacing: normal;
		transition:
			opacity 0.5s,
			letter-spacing 0.5s;
	}
</style>
