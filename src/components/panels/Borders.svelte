<script>
	import { onMount } from 'svelte';

	let border;

	onMount(() => {
		observeElement(border);
	});

	function observeElement(element) {
		if (!element) return;

		const observer = new IntersectionObserver(entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.style.opacity = '1';
					entry.target.style.width = '70%';
					entry.target.style.height = '4px';
				}
			});
		});

		observer.observe(element);
	}
</script>

<span class="app-panels__border" bind:this={border}></span>

<style lang="scss">
	.app-panels__border {
		position: absolute;
		left: 15%;
		bottom: 0;
		width: 0;
		height: 0;
		opacity: 0;
		transition: all 1s;
		// background-color: rgba(255, 93, 93, 0.7);
		background-color: #806c66;
	}
</style>
