<script>
	import { isMobileStore } from '../stores/isMobileStore';
	import { myCodeItemActive } from '../stores/navigationStores';
	import { fS } from '../stores/highlightCodeFontSize';

	import { codeData } from '../scripts/myCode';

	import Highlight from 'svelte-highlight';
	import javascript from 'svelte-highlight/languages/javascript';
	import scss from 'svelte-highlight/languages/scss';
	import xml from 'svelte-highlight/languages/xml';
	import githubDark from 'svelte-highlight/styles/github-dark';

	import { fontSizer } from '../actions/fontSizer';

	let min = $isMobileStore.aspectRatio ? 1 : 2;
	let max = $isMobileStore.aspectRatio ? 4 : 5;

	let fontSize = $isMobileStore.aspectRatio ? `${$fS}vw` : `${$fS}vh`;
	let showMessage = false;

	const zoomOut = () => {
		if ($fS > min) $fS -= 0.5;

		if ($isMobileStore.aspectRatio) fontSize = `${$fS}vw`;
		else fontSize = `${$fS}vh`;
	};

	const zoomIn = () => {
		if ($fS < max) $fS += 0.5;

		if ($isMobileStore.aspectRatio) fontSize = `${$fS}vw`;
		else fontSize = `${$fS}vh`;
	};
	let copy = '';

	const copyCode = () => {
		codeData[$myCodeItemActive].codeHighlighted.forEach(code => {
			copy += '\n' + '\n' + code.code;
			navigator.clipboard.writeText(copy);
		});

		showMessage = true;
		setTimeout(() => {
			showMessage = false;
		}, 2000);
	};
</script>

<svelte:head>
	{@html githubDark}
</svelte:head>

<section class="highlight">
	{#if showMessage}
		<span aria-live="polite" class="alert">Code copied to clipboard</span>
	{/if}
	{#each codeData[$myCodeItemActive].codeHighlighted as _, index}
		{#if codeData[$myCodeItemActive].codeHighlighted[index].language === 'javascript'}
			<Highlight
				language={javascript}
				code={codeData[$myCodeItemActive].codeHighlighted[index].code}
				style={`font-size: ${fontSize}; margin: unset; height: 100% text-wrap: wrap;`}
			/>
		{/if}
		{#if codeData[$myCodeItemActive].codeHighlighted[index].language === 'xml'}
			<Highlight
				language={xml}
				code={codeData[$myCodeItemActive].codeHighlighted[index].code}
				style={`font-size: ${fontSize}; margin: unset; height: 100% text-wrap: wrap;`}
			/>
		{/if}
		{#if codeData[$myCodeItemActive].codeHighlighted[index].language === 'scss'}
			<Highlight
				language={scss}
				code={codeData[$myCodeItemActive].codeHighlighted[index].code}
				style={`font-size: ${fontSize}; margin: unset; height: 100% text-wrap: wrap;`}
			/>
		{/if}
	{/each}

	<div class="highlight__interact">
		<button title="zoom out" on:click={zoomOut} class="highlight__interact-button highlight__interact-button--zoom-out" use:fontSizer={{ h: true, p: 30 }}>
			{#if !$isMobileStore.aspectRatio}
				<svg
					class="highlight__interact-button--zoom-out-svg"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					x="0px"
					y="0px"
					viewBox="0 0 512 640"
					style="enable-background:new 0 0 512 512;"
					xml:space="preserve"
				>
					<g>
						<path
							d="M498.8,493.2L316.7,311.1c31.5-33,48.8-76.1,48.8-121.8c0-47.1-18.3-91.4-51.6-124.7S236.4,13,189.3,13   S97.9,31.3,64.6,64.6S13,142.2,13,189.3S31.3,280.7,64.6,314s77.6,51.6,124.7,51.6c45.8,0,88.8-17.3,121.8-48.9l182.1,182.1   c0.8,0.8,1.8,1.2,2.8,1.2s2-0.4,2.8-1.2C500.4,497.3,500.4,494.7,498.8,493.2z M308.2,308.3c-31.8,31.8-74,49.3-119,49.3   s-87.2-17.5-119-49.3C38.5,276.5,21,234.2,21,189.3s17.5-87.2,49.3-119S144.4,21,189.3,21s87.2,17.5,119,49.3s49.3,74.1,49.3,119   C357.5,234.2,340,276.5,308.2,308.3z"
						/>
						<path d="M249.9,185.2H128.6c-2.2,0-4,1.8-4,4s1.8,4,4,4h121.3c2.2,0,4-1.8,4-4S252.1,185.2,249.9,185.2z" />
					</g>
				</svg>
			{/if}
			zoom out
		</button>
		<button class="highlight__interact-button" on:click={copyCode} use:fontSizer={{ h: true, p: 30 }}>copy code</button>
		<button title="zoom in" on:click={zoomIn} class="highlight__interact-button highlight__interact-button--zoom-in" use:fontSizer={{ h: true, p: 30 }}>
			zoom in
			{#if !$isMobileStore.aspectRatio}
				<svg
					class="highlight__interact-button--zoom-in-svg"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					version="1.1"
					x="0px"
					y="0px"
					viewBox="0 0 512 640"
					style="enable-background:new 0 0 512 512;"
					xml:space="preserve"
					><g>
						<path
							d="M498.8,493.1L316.7,311c31.5-33,48.8-76.1,48.8-121.8c0-47.1-18.3-91.4-51.6-124.6C280.6,31.3,236.4,13,189.3,13   S97.9,31.3,64.6,64.6S13,142.1,13,189.2s18.3,91.4,51.6,124.7s77.6,51.6,124.7,51.6c45.8,0,88.8-17.3,121.8-48.8l182.2,182.1   c0.8,0.8,1.8,1.2,2.8,1.2s2-0.4,2.8-1.2C500.4,497.2,500.4,494.7,498.8,493.1z M308.2,308.3c-31.8,31.8-74,49.3-119,49.3   s-87.2-17.5-119-49.3s-49.3-74.1-49.3-119c0-45,17.5-87.2,49.3-119S144.3,21,189.3,21s87.2,17.5,119,49.3s49.3,74,49.3,119   S340,276.5,308.2,308.3z"
						/>
						<path
							d="M249.9,185.3h-56.7v-56.7c0-2.2-1.8-4-4-4s-4,1.8-4,4v56.7h-56.7c-2.2,0-4,1.8-4,4s1.8,4,4,4h56.7V250c0,2.2,1.8,4,4,4   s4-1.8,4-4v-56.7h56.7c2.2,0,4-1.8,4-4S252.1,185.3,249.9,185.3z"
						/>
					</g>
				</svg>
			{/if}
		</button>
	</div>
</section>

<style lang="scss">
	@import '../scss/main.scss';

	@keyframes display {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	.highlight :global(code) {
		width: fit-content;
		box-sizing: border-box;
		min-width: 100%;
		min-height: 100%;
		padding: 5vw 5vw 0 5vw;
		background-color: black;

		@media (min-aspect-ratio: 1/1) {
			padding: 2vw 2vw 0 2vw;
		}
	}

	.alert {
		z-index: 1;
		position: fixed;
		bottom: 20vh;
		left: 50%;
		transform: translateX(-50%);
		background-color: black;
		box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);
		font-size: 2vw;
		color: #f7e7ce;
		padding: 0.5em 1em;
		border-radius: 5px;
		text-wrap: nowrap;

		opacity: 0;

		animation: display 0.3s 0.3s forwards;

		@media (max-aspect-ratio: 1/1) {
			bottom: 15vh;
			font-size: 5vw;
		}
	}

	.highlight {
		box-sizing: border-box;
		overflow-y: scroll;
		width: 100%;
		height: 100%;
		opacity: 0;
		padding-bottom: 20vh;
		background-color: black;

		animation: display 0.6s forwards;

		@media (max-aspect-ratio: 1/1) {
			height: calc(100vh - 5vw - 20vh);
		}

		&__interact {
			position: fixed;
			bottom: 5vh;
			left: 50%;
			transform: translateX(-50%);
			display: flex;
			justify-content: center;
			width: fit-content;
			gap: 2vw;

			&-button {
				cursor: pointer;
				width: 30vw;
				height: 15vw;
				display: flex;
				align-items: center;
				justify-content: center;
				gap: 1vw;
				padding: 1vw;
				background-color: #f7e7ced8;
				color: black;
				font-weight: 500;
				box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);
				border: 2px solid transparent;
				opacity: 0;

				transition: all 0.1s;

				animation: display 0.6s 0.3s forwards;

				@media (min-aspect-ratio: 1/1) {
					width: 18vw;
					height: 6vw;
				}

				& svg {
					width: 3vw;
					height: 3vw;

					& path {
						transition: 0.1s;
						fill: black;
					}
				}

				&:hover {
					background-color: #191919;
					color: #f7e7ce;
					border: 2px solid #f7e7ce;
					box-shadow: unset;

					& svg path {
						fill: #f7e7ce;
					}
				}
			}
		}
	}
</style>
