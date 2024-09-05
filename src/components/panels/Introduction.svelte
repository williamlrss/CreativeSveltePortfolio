<script>
	import { isMobileStore } from '../../stores/isMobileStore';
	import { isMenuActive } from '../../stores/navigationStores';
	import { onDestroy, onMount } from 'svelte';
	import { preventClickOnTouchMove } from '../../utils/preventClickOnTouchMove';

	import { PHONE_NUMBER, EMAIL, LINKEDIN } from '../../stores/constants';

	let title;
	let progress = 0;

	const ioInit = es => {
		const event = es[0];
		const r = event.intersectionRatio;
		progress = 1 - r * 100 + 100;
	};

	const options = {
		root: null,
		threshold: Array.from({ length: 100 }, (_, i) => i / 100),
		rootMargin: '0px 0px 0px 0px',
	};

	const io = new IntersectionObserver(ioInit, options);

	onMount(() => {
		io.observe(title);
	});

	onDestroy(() => {
		io.unobserve(title);
		io.disconnect();
	});

	const followLinkOnMobile = url => e => {
		if (preventClickOnTouchMove(e) === true) window.open(url, '_blank');
	};
</script>

<section class="intro">
	{#if !$isMobileStore.aspectRatio}
		<div class="intro__contact">
			<a
				on:click={followLinkOnMobile(`tel:${PHONE_NUMBER}`)}
				on:touchend={followLinkOnMobile(`tel:${PHONE_NUMBER}`)}
				on:touchmove={followLinkOnMobile(`tel:${PHONE_NUMBER}`)}
				class="intro__contact-item"
				href="tel:{PHONE_NUMBER}">{PHONE_NUMBER}</a
			>
			<a
				on:click={followLinkOnMobile(`mailto:${EMAIL}`)}
				on:touchend={followLinkOnMobile(`mailto:${EMAIL}`)}
				on:touchmove={followLinkOnMobile(`mailto:${EMAIL}`)}
				class="intro__contact-item"
				href="mailto:{EMAIL}">{EMAIL}</a
			>
			<a
				on:click={followLinkOnMobile(`https://www.linkedin.com/${LINKEDIN}`)}
				on:touchend={followLinkOnMobile(`https://www.linkedin.com/${LINKEDIN}`)}
				on:touchmove={followLinkOnMobile(`https://www.linkedin.com/${LINKEDIN}`)}
				class="intro__contact-item"
				target="_blank"
				href="https://www.linkedin.com/{LINKEDIN}">in/williamlerossignol</a
			>
		</div>
	{/if}

	<div class="intro__heading" class:intro__heading--inactive={$isMenuActive} bind:this={title}>
		<p class="intro__heading-subtitle">Hi there! I am</p>
		<h1 class="intro__heading-title">
			William Lerossignol
			<p aria-hidden="true" class="aria-hidden">williamlrss</p>
		</h1>
		<span class="intro__heading-clip" style="transform: scale({100 + progress}%, 100%); will-change: transform;"></span>
		<svg
			style="z-index: 1;"
			class="intro__heading-man"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			x="0px"
			y="0px"
			viewBox="0 0 100 125"
			enable-background="new 0 0 100 100"
			xml:space="preserve"
			><path
				d="M50.396,91.75c-1.348-0.002-1.649-0.663-1.758-1.658c-0.53-4.847-1.117-9.688-1.668-14.532  c-0.178-1.565-0.215-3.151-0.477-4.7c-0.364-2.154-0.93-4.273-1.316-6.424c-0.637-3.548-1.193-7.111-1.798-10.665  c-0.093-0.547-0.266-1.08-0.504-2.028c-0.399,0.827-0.608,1.262-0.832,1.726c-1.544-0.074-1.523-1.485-1.95-2.385  c-1.517-3.194-2.945-6.432-4.341-9.681c-0.636-1.479-1.129-3.019-1.659-4.541c-0.066-0.189-0.005-0.455,0.073-0.656  c1.667-4.313,3.32-8.632,5.052-12.919c0.216-0.534,0.802-0.987,1.317-1.321c2.431-1.574,4.897-3.093,7.068-4.455  c0.151-2.808,0.182-5.361,0.461-7.886c0.201-1.814,2.664-3.261,4.407-2.782c0.249,0.068,0.56,0.26,0.655,0.477  c0.437,0.994,0.808,2.017,1.267,3.192c-0.602,0-0.973,0-1.513,0c-0.472,2.102-0.964,4.295-1.486,6.621  c3.57,0.685,6.053,3.104,8.672,5.261c0.527,0.434,0.935,1.355,0.928,2.046c-0.088,7.895-0.147,15.795-0.5,23.681  c-0.095,2.135-1.148,4.229-1.768,6.339c-0.538,1.832-1.084,3.661-1.695,5.721c-0.331-0.121-0.813-0.297-1.443-0.527  c-0.331,2.263-0.705,4.553-0.994,6.853c-0.549,4.38-1.053,8.767-1.567,13.151c-0.095,0.811-0.05,1.652-0.25,2.433  c-0.202,0.789-0.667,1.507-0.945,2.282c-0.404,1.128-0.856,2.258-1.081,3.427C50.513,89.049,50.512,90.343,50.396,91.75z"
			/></svg
		>
		<svg
			class="intro__heading-man intro__heading-man--shadow"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			version="1.1"
			x="0px"
			y="0px"
			viewBox="0 0 100 125"
			enable-background="new 0 0 100 100"
			xml:space="preserve"
		>
			<path
				style="transform: rotateX(65deg) rotateZ({350 - progress / 2}deg); will-change: transform;"
				d="M50.396,91.75c-1.348-0.002-1.649-0.663-1.758-1.658c-0.53-4.847-1.117-9.688-1.668-14.532  c-0.178-1.565-0.215-3.151-0.477-4.7c-0.364-2.154-0.93-4.273-1.316-6.424c-0.637-3.548-1.193-7.111-1.798-10.665  c-0.093-0.547-0.266-1.08-0.504-2.028c-0.399,0.827-0.608,1.262-0.832,1.726c-1.544-0.074-1.523-1.485-1.95-2.385  c-1.517-3.194-2.945-6.432-4.341-9.681c-0.636-1.479-1.129-3.019-1.659-4.541c-0.066-0.189-0.005-0.455,0.073-0.656  c1.667-4.313,3.32-8.632,5.052-12.919c0.216-0.534,0.802-0.987,1.317-1.321c2.431-1.574,4.897-3.093,7.068-4.455  c0.151-2.808,0.182-5.361,0.461-7.886c0.201-1.814,2.664-3.261,4.407-2.782c0.249,0.068,0.56,0.26,0.655,0.477  c0.437,0.994,0.808,2.017,1.267,3.192c-0.602,0-0.973,0-1.513,0c-0.472,2.102-0.964,4.295-1.486,6.621  c3.57,0.685,6.053,3.104,8.672,5.261c0.527,0.434,0.935,1.355,0.928,2.046c-0.088,7.895-0.147,15.795-0.5,23.681  c-0.095,2.135-1.148,4.229-1.768,6.339c-0.538,1.832-1.084,3.661-1.695,5.721c-0.331-0.121-0.813-0.297-1.443-0.527  c-0.331,2.263-0.705,4.553-0.994,6.853c-0.549,4.38-1.053,8.767-1.567,13.151c-0.095,0.811-0.05,1.652-0.25,2.433  c-0.202,0.789-0.667,1.507-0.945,2.282c-0.404,1.128-0.856,2.258-1.081,3.427C50.513,89.049,50.512,90.343,50.396,91.75z"
			/></svg
		>
	</div>
</section>

<style lang="scss">
	@import '../../scss/main.scss';

	.aria-hidden {
		position: absolute !important;
		width: 1px !important;
		height: 1px !important;
		overflow: hidden !important;
		clip: rect(1px, 1px, 1px, 1px) !important;
		white-space: nowrap !important;
	}

	.intro {
		z-index: 1;
		position: relative;
		display: grid;
		place-items: center;
		width: 100%;
		height: 100%;

		&__contact {
			z-index: 1;
			position: absolute;
			top: 0;

			display: flex;
			box-sizing: border-box;
			padding: 1vw;

			width: 100%;
			gap: 15vw;
			font-size: 2vw;
			color: #f7e7ce;
			justify-content: center;
		}
	}

	.intro__heading {
		position: relative;
		background-color: #085863;
		width: 100%;
		height: 100vh;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		opacity: 1;
		transition: all 0.5s;

		@media (max-aspect-ratio: 1/1) {
			height: 90vh;
		}

		&--inactive {
			opacity: 0;
		}

		&-title {
			font-size: 8vw;
			font-weight: 900;
			color: #f7e7ce;

			@media (min-aspect-ratio: 1/1) {
				font-size: 6vw;
				font-weight: 100;
			}
		}

		&-subtitle {
			font-size: 6vw;
			color: #f7e7ce;

			@media (min-aspect-ratio: 1/1) {
				font-size: 4vw;
			}
		}

		&-clip {
			position: absolute;
			width: 100%;
			height: 100%;
			background-color: #191919de;
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.1);
			clip-path: polygon(40% 71%, 54% 71%, 100% 100%, 60% 100%);
		}

		&-man {
			position: absolute;
			fill: #191919e6;
			width: calc(6em + 6vw);
			right: 43%;
			bottom: 30%;
			transform: translate(60%, 70%);
			z-index: 1;
			overflow: visible;

			&:first-child {
				z-index: 1;
			}

			&--shadow {
				fill: #f7e7ce;
				right: 43%;
				bottom: 31%;
				transform: translate(60.5%, 72%);
				z-index: 0;

				& > path {
					transform-origin: 50% 75%;
					// transition: transform 0.3s ease-out;
				}
			}
		}
	}
</style>
