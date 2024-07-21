<script>
	import Introduction from './panels/Introduction.svelte';
	import WebDev from './panels/webDev.svelte';
	import TextOnScroll from './panels/TextOnScroll.svelte';
	import Objectives from './panels/Objectives.svelte';
	import ScrollX from './panels/ScrollX.svelte';

	import Outro from './panels/Outro.svelte';

	import { isMobileStore } from '../stores/isMobileStore';

	let appPanelsParent;

	let components = [
		{ component: Introduction },
		{ component: WebDev },
		{ component: TextOnScroll },
		{ component: Objectives },
		{ component: ScrollX },
		{ component: Outro },
	];
</script>

<div bind:this={appPanelsParent} style={$isMobileStore.aspectRatio ? 'height: 90%;' : ''}>
	{#each components as { component: Comp, props }, i}
		<section class="app-panels" data-index={i}>
			<svelte:component this={Comp} {...props} />
		</section>
	{/each}
</div>

<style lang="scss">
	.app-panels {
		position: relative;
		overflow: hidden;
		box-sizing: border-box;
		// margin: 5%;

		&:nth-child(1),
		&:nth-child(2),
		&:nth-child(4) {
			transform: scale(80%);
		}

		&:nth-child(4) {
			// overflow: visible;
			z-index: 0;
		}

		&:nth-child(5) {
			z-index: 1;
		}
	}
</style>
