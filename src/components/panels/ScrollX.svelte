<script>
	import { debounce } from '../../scripts/debounce';
	import { onMount, onDestroy } from 'svelte';

	import ScrollXProps from './ScrollXProps.svelte';

	import secretName from '../../assets/svg/secretName.svg';

	import portfolioPerformance from '../../assets/images/portfolioPerformance.png';
	import portfolio from '../../assets/images/portfolio.jpg';
	import portfolioDesktop from '../../assets/images/portfolioDesktop.png';

	import kasa from '../../assets/images/kasa.png';
	import kasaMobile from '../../assets/images/kasaMobile.png';
	import kasaDesktop from '../../assets/images/kasaDesktop.png';

	import hotTakesHtop from '../../assets/images/hotTakesHtop.png';
	import hotTakes from '../../assets/images/hotTakes.png';
	import hotTakesCoverage from '../../assets/images/hotTakesCoverage.png';

	import kanapForm from '../../assets/images/kanapForm.png';
	import kanap from '../../assets/images/kanap.png';
	import kanapRender from '../../assets/svg/kanapRender.svg';

	import ohmyfoodMobile from '../../assets/images/ohmyfoodMobile.png';
	import ohmyfood from '../../assets/images/ohmyfood.png';
	import ohmyfoodDesktop from '../../assets/images/ohmyfoodDesktop.png';

	import bookiMobile from '../../assets/images/bookiMobile.png';
	import booki from '../../assets/images/booki.png';
	import bookiDesktop from '../../assets/images/bookiDesktop.png';

	let nodeScrollX;
	let nodeScrollXHeight = '0px';

	let io;
	let progress = 0;

	const ioInit = es => {
		const e = es[0];
		let r = e.intersectionRatio * 135;

		progress = r;
		progress = Math.max(0, Math.min(progress, 135));
	};

	const options = {
		root: null,
		threshold: Array.from({ length: 10000 }, (_, i) => i / 10000),
		rootMargin: `${window.innerHeight + nodeScrollXHeight} 0px 0px 0px`,
	};

	const onResize = e => {
		nodeScrollXHeight = e.contentRect.height + 'px';
		io.disconnect();
		options.rootMargin = `${window.innerHeight + nodeScrollXHeight} 0px 0px 0px`;
		io = new IntersectionObserver(ioInit, options);
		io.observe(nodeScrollX);
	};

	const onResizeDebounce = debounce(onResize, 50);

	const roInit = es => {
		const e = es[0];
		onResizeDebounce(e);
	};

	const ro = new ResizeObserver(roInit);

	onMount(() => {
		if (nodeScrollX) {
			nodeScrollXHeight = `${nodeScrollX.getBoundingClientRect().height}px`;
			options.rootMargin = `${window.innerHeight + nodeScrollXHeight} 0px 0px 0px`;
			ro.observe(nodeScrollX);
			io = new IntersectionObserver(ioInit, options);
			io.observe(nodeScrollX);
		}
	});

	onDestroy(() => {
		ro.disconnect();
		io.unobserve(nodeScrollX);
		io.disconnect();
	});

	const setTitleContent = progress => {
		if (progress > 5 && progress <= 13)
			return {
				titleContent: 'ongoing project',
				opacity: 0.6,
			};
		else if (progress > 26 && progress < 100)
			return {
				titleContent: 'training projects',
				opacity: 0.6,
			};
		else
			return {
				titleContent: '',
				opacity: 0,
			};
	};
</script>

<div class="scrollX" bind:this={nodeScrollX}>
	<h2
		class="scrollX__title"
		style="pointer-event: none; font-variant-caps: all-small-caps; font-weight: 400; opacity: {setTitleContent(progress)
			.opacity}; transition: opacity 0.5s ease-in-out"
	>
		{setTitleContent(progress).titleContent}
	</h2>
	<div class="scrollX__fixed" style="transform: translate3d({-progress}%, 0, 0);">
		<ScrollXProps bg={'#7C3498'} srcBefore={''} srcMain={secretName} srcAfter={''} name="fullstackNoName" title="Fullstack Data&AI Project" />
		<ScrollXProps
			bg={'#7C3498'}
			srcBefore={portfolioPerformance}
			srcMain={portfolio}
			srcAfter={portfolioDesktop}
			name="Portfolio"
			title="Svelte.js WebPortfolio Performance-oriented"
		/>
		<ScrollXProps
			bg={'#085863'}
			link={'https://kasa.williamlrss.com/'}
			srcBefore={kasaMobile}
			srcMain={kasa}
			srcAfter={kasaDesktop}
			name="Kasa"
			title="React.jsx Introduction Rental-platform"
		/>
		<ScrollXProps
			bg={'#085863'}
			link={'https://hottakes.williamlrss.com/'}
			srcBefore={hotTakesCoverage}
			srcMain={hotTakes}
			srcAfter={hotTakesHtop}
			name="HotTakes"
			title="Node.js Backend VM-Integrated"
		/>
		<ScrollXProps
			bg={'#085863'}
			link={'https://kanap.williamlrss.com/'}
			srcBefore={kanapRender}
			srcMain={kanap}
			srcAfter={kanapForm}
			name="Kanap"
			title="Frontend JS-Vanilla VM-Integrated"
		/>
		<ScrollXProps
			bg={'#022539'}
			link={'https://ohmyfood.williamlrss.com/'}
			srcBefore={ohmyfoodMobile}
			srcMain={ohmyfood}
			srcAfter={ohmyfoodDesktop}
			name="OhMyFood"
			title="Simple Sass-SCSS Introduction"
		/>
		<ScrollXProps
			bg={'#022539'}
			link={'https://booki.williamlrss.com/'}
			srcBefore={bookiMobile}
			srcMain={booki}
			srcAfter={bookiDesktop}
			name="Booki"
			title="myFirst HTML-CSS DevProject"
		/>
	</div>
</div>

<style lang="scss">
	.scrollX {
		height: 1100vh;

		&__title {
			position: fixed;
			top: 35%;
			left: 50%;
			transform: translate(-50%, -65%);
			color: white;
			font-size: 8vw;

			@media (min-aspect-ratio: 1/1) {
				font-size: 6vw;
			}

			@media (max-aspect-ratio: 1/1) {
				text-wrap: nowrap;
				top: unset;
				bottom: 10vh;
				left: 50%;
			}
		}

		&__fixed {
			z-index: 1;
			position: fixed !important;
			top: -5vh;
			left: 100vw;

			display: flex;
			gap: 15vw;
			height: 100vh;

			will-change: transform;

			// @media (max-aspect-ratio: 1/1) {
			// 	top: -5vh;
			// }
		}
	}
</style>
