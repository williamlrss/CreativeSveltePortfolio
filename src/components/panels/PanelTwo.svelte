<script>
	import { elOnScrollPos } from '../../actions/elOnScrollPos';
	import { isMobileStore } from '../../stores/isMobileStore';

	let h, dL;
	const mobileH = 200;
	const desktopH = 250;

	$: if ($isMobileStore.aspectRatio) {
		h = mobileH;
		dL = -700;
	} else {
		h = desktopH;
		dL = -550;
	}

	const createWithLove = 'I create with love'.split('').map(letter => (letter === ' ' ? '&nbsp;' : letter));
</script>

<section class="panelTwo">
	<!-- <span class="panelTwo__developer">
		<h2 class="panelTwo__developer-els" use:elOnScrollPos={{ panelN: 2, panelH: 120, pxDelay: 0, onScrollDelay: dL, duration: 0.1, delay: 0 }}>
			I'm a Web Developer
		</h2>
	</span> -->

	<!-- <span class="panelTwo__create">
		<h2 class="panelTwo__create-els" use:elOnScrollPos={{ panelN: 2, panelH: 200, pxDelay: 0, onScrollDelay: 250, duration: 0.1, delay: 0 }}>
			I create with love
		</h2>
	</span> -->

	<span class="panelTwo__create">
		{#each createWithLove as letter, index}
			<p class="panelTwo__create-els" use:elOnScrollPos={{ panelN: 2, panelH: 200, pxDelay: 0, onScrollDelay: `${index * 75}`, duration: 0.1, delay: 0 }}>
				{@html letter}
			</p>
		{/each}
	</span>

	{#if !$isMobileStore.touchSupport}
		<span class="panelTwo__create--shadow">
			{#each createWithLove as letter, index}
				<p
					class="panelTwo__create--shadow-els"
					use:elOnScrollPos={{ panelN: 2, panelH: 200, pxDelay: -40, onScrollDelay: `${index * 75}`, duration: 0.1, delay: 0 }}
				>
					{@html letter}
				</p>
			{/each}
		</span>
	{/if}
</section>

<style lang="scss">
	.panelTwo {
		display: grid;
		place-items: center;
		width: 100vw;
		height: 200vh;

		&__developer {
			position: absolute;
			top: -20%;
			display: flex;
			justify-content: flex-start;
			width: 55%;

			&-els {
				font-size: 5em;
				font-weight: 500;
			}
		}
	}

	.panelTwo__create {
		z-index: 3;
		position: absolute;
		bottom: -20%;
		display: flex;
		justify-content: flex-start;
		width: 55%;
		opacity: 0.7;

		&-els {
			font: inherit;
			font-size: 5em;
		}
	}

	.panelTwo__create--shadow {
		@extend .panelTwo__create;
		z-index: 1;
		width: 56%;

		&-els {
			font: inherit;
			font-size: 6em;
			background-image: linear-gradient(to bottom, #e6be8a, rgba(0, 0, 0, 0));
			-webkit-background-clip: text;
			background-clip: text;
			color: transparent;
			opacity: 0.9;
		}
	}
</style>
