<script>
	import PanelOne from './panels/PanelOne.svelte';
	import PanelTwo from './panels/PanelTwo.svelte';
	import Border from './panels/Borders.svelte';

	// import { scrollStore } from '../stores/scrollStore';
	// let containerStyle = '';
	// $: containerStyle = `transform: translateY(-${$scrollStore.scrollY * 3}px)`;
</script>

<section class="app-panels">
	<PanelOne />
	<Border />
</section>
<section class="app-panels">
	<PanelTwo />
	<Border />
</section>
<section class="app-panels">
	<Border />
</section>
<section class="app-panels">
	<Border />
</section>
<section class="app-panels">
	<Border />
</section>

<style lang="scss">
	.app-panels {
		position: relative;
		overflow: hidden;
		width: 100vw;
		height: 150vh;

		@media (min-aspect-ratio: 1/1) {
			height: 200vh;
		}
	}
</style>
