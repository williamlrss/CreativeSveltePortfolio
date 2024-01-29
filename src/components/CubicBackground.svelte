<script>
	import { onMount, onDestroy } from 'svelte';
	import cubicEls from '../images/cubicEls.png';

	let isUserAfk = false;
	let lastActivityTime = Date.now();
	let cubicGridItems;

	const updateUserActivityTime = () => {
		lastActivityTime = Date.now();
		isUserAfk = false;
	};

	const checkUserActivity = timestamp => {
		if (Date.now() - lastActivityTime >= 3000) {
			isUserAfk = true;
		} else {
			isUserAfk = false;
		}
		cubicGridItems.forEach(img => {
			if (isUserAfk) {
				performAnimation(img, timestamp);
			} else {
				resetAnimation(img);
			}
		});
		requestAnimationFrame(checkUserActivity);
	};

	const startTime = new Map();

	const performAnimation = (element, timestamp) => {
		if (!startTime.has(element)) {
			startTime.set(element, timestamp);
		}
		const elapsedTime = timestamp - startTime.get(element);
		const duration = 2000; // 2 seconds
		const progress = elapsedTime / duration;
		const translateValue = progress * 204 - 102; // Ranges from -102 to 102
		element.style.transform = `translate(${translateValue}%, ${translateValue}%)`;

		if (progress >= 1) {
			startTime.set(element, timestamp);
		}
	};

	const resetAnimation = element => {
		element.style.transform = 'translate(-102%, -102%)';
		startTime.delete(element);
	};

	onMount(() => {
		cubicGridItems = document.querySelectorAll('.cubic-grid-items-img');
		document.addEventListener('mousemove', updateUserActivityTime);
		document.addEventListener('scroll', updateUserActivityTime);
		requestAnimationFrame(checkUserActivity);
	});

	onDestroy(() => {
		document.removeEventListener('mousemove', updateUserActivityTime);
		document.removeEventListener('scroll', updateUserActivityTime);
	});
</script>

<section class="cubic-grid">
	{#each Array(10) as _, i}
		<div class="cubic-grid-items">
			<img
				class="cubic-grid-items-img {isUserAfk ? 'cubic-grid-items-img--active' : 'cubic-grid-items-img--inactive'}"
				src={cubicEls}
				alt="Cubic Element {i}"
			/>
		</div>
	{/each}
</section>

<style lang="scss">
	.cubic-grid {
		overflow: hidden;
		pointer-events: none;
		position: fixed;
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		grid-template-rows: repeat(2, 1fr);
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		gap: 10%;

		&-items {
			overflow: hidden;

			&-img {
				width: 100%;
				height: 100%;
				object-fit: none;
				transition: opacity 0.4s;
				transform: translate(-102%, -102%);

				&--active {
					opacity: 0.3;
				}

				&--inactive {
					opacity: 0;
				}
			}
		}
	}
</style>
