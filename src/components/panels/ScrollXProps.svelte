<script>
	import { onDestroy, onMount } from 'svelte';
	import { preventClickOnTouchMove } from '../../utils/preventClickOnTouchMove';

	export let srcMain;
	export let srcBefore;
	export let srcAfter;

	let altBefore = '';
	let altMain = '';
	let altAfter = '';

	let nodeScrollXDev, nodeTitleSpanParent, nodeBefore, nodeAfter;

	export let bg = '';
	export let name = '';
	export let title = '';
	export let link = '';

	let words = title.split(' ').map(word => word);

	let iRatio,
		ratio,
		translateXIR = 0;
	let animationFrameId;

	const updateStyles = () => {
		const translateXIR30 = Math.max(0, 50 * (1 - ratio));
		const translateXIR20 = Math.max(0, 30 * (1 - ratio));
		const translateXIR10 = Math.max(0, 20 * (1 - ratio));

		nodeTitleSpanParent.childNodes[0].style.setProperty('--translateXIR30', `${translateXIR30}%`);
		nodeTitleSpanParent.childNodes[1].style.setProperty('--translateXIR20', `${translateXIR20}%`);
		nodeTitleSpanParent.childNodes[2].style.setProperty('--translateXIR10', `${translateXIR10}%`);

		animationFrameId = requestAnimationFrame(updateStyles);
	};

	const ioInit = es => {
		const event = es[0];

		iRatio = event.intersectionRatio;
		ratio = Math.round(iRatio * 100) / 100;

		translateXIR = iRatio * 100 * 0.5;

		if (animationFrameId) {
			cancelAnimationFrame(animationFrameId);
		}

		animationFrameId = requestAnimationFrame(updateStyles);
	};

	const options = {
		root: null,
		threshold: Array.from({ length: 10000 }, (_, i) => i / 10000),
		rootMargin: '0px 0px 0px 0px',
	};

	const io = new IntersectionObserver(ioInit, options);

	onMount(() => {
		io.observe(nodeScrollXDev);
	});

	onDestroy(() => {
		io.unobserve(nodeScrollXDev);
		io.disconnect();
		if (animationFrameId) cancelAnimationFrame(animationFrameId);
	});

	const followLinkOnMobile = url => e => {
		if (preventClickOnTouchMove(e) === true) window.open(url, '_blank');
	};
</script>

<div data-name={name} class="scrollXProps" bind:this={nodeScrollXDev}>
	<div
		style="opacity: 1; z-index: 0; position: absolute; top: 15%; left: 0; width: 90%; height: 50%; transform: scaleY({iRatio *
			100}%); transform-origin: top; background-color: {bg}; will-change: transform;"
	></div>
	<img class="scrollXProps__img" loading="lazy" src={srcMain} alt={altMain} />

	<img
		class="scrollXProps__img scrollXProps__img--before"
		style="transform: translate3d({-translateXIR}%, 0, 0);"
		loading="lazy"
		src={srcBefore}
		alt={altBefore}
		bind:this={nodeBefore}
	/>

	<img
		class="scrollXProps__img scrollXProps__img--after"
		style="transform: translate3d({translateXIR}%, 0, 0);"
		loading="lazy"
		src={srcAfter}
		alt={altAfter}
		bind:this={nodeAfter}
	/>

	<h2 class="scrollXProps-title" bind:this={nodeTitleSpanParent}>
		{#each words as word}
			<span class="scrollXProps-title__element">
				{word}
			</span>
		{/each}
	</h2>
	{#if link}
		<a
			on:click={followLinkOnMobile(link)}
			on:touchend={followLinkOnMobile(link)}
			on:touchmove={followLinkOnMobile(link)}
			class="scrollXProps__button"
			href={link}
			target="_blank">Visit website</a
		>
	{/if}
</div>

<style lang="scss">
	@import '../../scss/main.scss';

	.scrollXProps {
		padding-top: 10vw;
		position: relative;
		width: 100vw;
		height: 50vh;

		display: grid;
		place-items: center;
		align-items: center;

		box-sizing: border-box;

		@media (min-aspect-ratio: 1/1) {
			height: 100vh;
		}

		&__img {
			position: absolute;
			z-index: 2;
			height: 50%;
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.8);
			scale: 0.5;

			@media (min-aspect-ratio: 1/1) {
				height: 80%;
			}

			&--before,
			&--after {
				opacity: 0.8;
				z-index: 1;
				scale: 0.6;

				will-change: transform;
			}
		}

		&-title {
			position: absolute;
			left: 5%;
			bottom: 0;
			display: flex;
			flex-direction: column;
			font-size: 8vw;
			font-weight: 500;
			font-variant-caps: all-small-caps;
			opacity: 0.8;

			@media (min-aspect-ratio: 1/1) {
				bottom: 5%;
				font-size: 4vw;
			}

			&__element {
				display: flex;
				will-change: transform;
				transition: transform 0.5s ease-out;

				&:first-child {
					transform: translateX(var(--translateXIR30));
				}

				&:nth-child(2) {
					transform: translateX(var(--translateXIR20));
				}

				&:last-child {
					transform: translateX(var(--translateXIR10));
				}

				& span {
					display: flex;
				}
			}

			& > span:nth-child(1) {
				z-index: 0;
			}

			& > span:nth-child(2) {
				z-index: 1;
			}

			& > span:nth-child(3) {
				z-index: 2;
			}
		}

		&__button {
			@extend .scrollXProps-title;
			left: unset;
			right: 15%;
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.8);
			padding: 20px;
			scale: 0.8;
			color: #f7e7ce;
			background-color: #191919;

			@media (max-aspect-ratio: 1/1) {
				right: 50%;
				transform: translateX(50%);
				bottom: -60%;
			}
		}
	}
</style>
