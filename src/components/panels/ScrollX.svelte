<script>
	import { debounce } from '../../scripts/debounce';
	import { onMount, onDestroy } from 'svelte';

	import ScrollXProps from './ScrollXProps.svelte';

	import src1Prop1 from '../../assets/svg/renderProductDetails.svg';
	import src2Prop1 from '../../assets/svg/fetchData.svg';
	import src3Prop1 from '../../assets/images/formInputValidation.png';

	import src1Prop2 from '../../assets/images/smartErrorHandling.png';
	import src2Prop2 from '../../assets/images/jestCoverage.png';
	import src3Prop2 from '../../assets/images/schemaFonctionnelWilliamlrss.png';

	import src1Prop3 from '../../assets/images/pageant.jpg';
	import src2Prop3 from '../../assets/images/htop.png';
	import src3Prop3 from '../../assets/images/apacheHottakesConf.png';

	// NODE EL
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
</script>

<div class="scrollX" bind:this={nodeScrollX}>
	<div class="scrollX__fixed" style="transform: translate3d({-progress}%, 0, 0);">
		<ScrollXProps bg={'#022539'} srcBefore={src2Prop1} srcMain={src1Prop1} srcAfter={src3Prop1} name="webDev" title="Vanilla —modular development" />
		<ScrollXProps bg={'#7C3498'} srcBefore={src2Prop2} srcMain={src1Prop2} srcAfter={src3Prop2} name="deploy" title="Log Test Deploy" />
		<ScrollXProps bg={'#085863'} srcBefore={src2Prop3} srcMain={src1Prop3} srcAfter={src3Prop3} name="APIs" title="Running APIs Server" />
	</div>
</div>

<style lang="scss">
	.scrollX {
		height: 500vh;

		&__fixed {
			z-index: 1;
			position: fixed !important;
			top: -5vh;
			left: 100vw;

			display: flex;
			gap: 15vw;
			height: 100vh;

			will-change: transform;

			@media (max-aspect-ratio: 1/1) {
				top: -5vh;
			}
		}
	}
</style>
