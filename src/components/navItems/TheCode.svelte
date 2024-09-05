<script>
	import { onMount, onDestroy } from 'svelte';

	import { myCodeItemActive } from '../../stores/navigationStores';
	import { scrollBackToButtonActive } from '../../stores/navigationStores';

	import CustomHighlight from '../CustomHighlight.svelte';

	import { hoverImage } from '../../actions/imageMouseHover';
	import { codeData } from '../../scripts/myCode';

	import { scrollBackToButton } from '../../actions/scrollBackToButton';

	let codeMark = `< />`;
	let waitAndRender = false;

	const selectMyCodeItem = index => {
		if (index === $myCodeItemActive) {
			// Return
			$myCodeItemActive = null;
		} else {
			// Select the unselected
			$myCodeItemActive = index;
			setTimeout(() => {
				if ($myCodeItemActive != null) {
					waitAndRender = true;
				}
			}, 900);
		}
	};

	$: if ($myCodeItemActive === null) {
		waitAndRender = false;
	}

	const returnOnEscape = event => {
		if (event.key === 'Escape') {
			$myCodeItemActive = null;
		}
	};

	onMount(() => {
		document.addEventListener('keydown', returnOnEscape);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', returnOnEscape);
	});

	let container;
	// console.log(myCode.img[0]);

	// $: if (container && $myCodeItemActive !== null) {
	// improvements:
	// cache / use cache --> store
	// 		selected = container.querySelectorAll('.myCode__button')[$myCodeItemActive];
	// 		console.log(selected, selected.offsetTop);
	// console.log(container.querySelectorAll('.myCode__button')[4]);
	// }

	let txt = [
		`Like Nuxt and Next.js, Svelte.js is one of the most effective next-generation frameworks.`,
		`The basic idea of this portfolio was to compose a website that reflects my current skills without the use of any external libraries except for 'Highlight.js' for code integration within this component.`,
		`Although it provides custom “on scroll” scripting with the help of browser APIs, list rendering for components and additional UI functions retrieved from CodePen.io.`,
		`This website was built intuitively and does not reflect a professional solution.`,
	];
</script>

<section class:myCode--active={$myCodeItemActive != null} class="myCode" use:scrollBackToButton={codeData.length} bind:this={container}>
	<div class="overlayOnScroll" class:overlayOnScroll--active={$scrollBackToButtonActive}></div>
	{#if $myCodeItemActive === null}
		<p class="myCode__heading">
			{#each txt as paragraph}
				<span>{paragraph}</span>
			{/each}
		</p>
	{/if}
	{#each codeData as _, index}
		{#if $myCodeItemActive === null || $myCodeItemActive === index}
			<button
				on:click={() => {
					selectMyCodeItem(index);
				}}
				class="myCode__button"
				class:myCode__button--active={$myCodeItemActive === index}
				class:myCode__button--overlayOnScroll={$scrollBackToButtonActive}
				use:hoverImage={{ src: codeData[index].img, navigationIndex: $myCodeItemActive }}
			>
				{#if $myCodeItemActive === null}
					<h3>{codeMark} {codeData[index].title}</h3>
					<p>{codeData[index].subtitle}</p>
				{:else}
					<h3>
						{codeMark}
						{codeData[index].title}
						<br />
						{codeData[index].subtitle}
					</h3>
					<p></p>
				{/if}
			</button>
		{/if}
	{/each}
	{#if $myCodeItemActive != null}
		<CustomHighlight />
	{/if}
</section>

<style lang="scss">
	@import '../../scss/main.scss';

	@keyframes display {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	@keyframes render {
		from {
			opacity: 0;
			pointer-events: none;
		}
		to {
			opacity: 1;
			pointer-events: unset;
		}
	}

	.overlayOnScroll {
		z-index: -1;
		position: absolute;
		pointer-events: none;
		background-color: transparent;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;

		transition: background-color 1s ease-out;

		&--active {
			pointer-events: auto;
			z-index: 300;

			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.myCode {
		display: flex;
		flex-direction: column;
		gap: 5vh;
		background-color: #085863;
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
		bottom: 0;
		height: 100%;
		padding: 15vh 0;
		opacity: 0;

		transition:
			height 0.5s 0.3s,
			all 0.3s;

		animation: render 0.9s forwards;

		@media (min-aspect-ratio: 1/1) {
			padding-top: 22vh;
		}

		&--active {
			overflow: hidden;
			height: 100%;
			padding: 0;
			gap: 0;
		}

		&__heading {
			padding: 4vw 8vw;
			width: 100%;
			margin-bottom: 10px;
			box-sizing: border-box;

			display: flex;
			flex-direction: column;
			gap: 1em;

			color: #ccc;
			transition: all 0.3s;

			font-size: 4vw;

			@media (min-aspect-ratio: 1/1) {
				font-size: 2vw;

				& > span {
					width: 80%;
					text-align: justify;
				}
			}
		}

		&__button {
			position: relative;
			cursor: pointer;
			display: flex;
			flex-direction: column;
			width: 82%;
			margin-left: 8%;
			box-sizing: border-box;
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.325);
			align-content: center;
			color: #191919;
			opacity: 0;
			background-color: #cccccc1f;

			transition:
				margin 0.4s,
				width 0.3s;

			animation: display 0.3s 0.1s forwards;

			& h3,
			& p {
				display: block;
				width: calc(100% - 2em);
				height: 100%;
				padding: 1em;

				transition:
					background-color 0.3s,
					color 0.3s;
			}

			& > h3 {
				background-color: #ccc;
				color: #191919;
				font-size: 4.5vw;
				@media (min-aspect-ratio: 1/1) {
					font-size: 2.5vw;
				}
			}

			& > p {
				color: #ccc;
				font-size: 4vw;
				font-style: italic;

				@media (min-aspect-ratio: 1/1) {
					font-size: 2vw;
				}
			}

			@media (min-aspect-ratio: 1/1) {
				width: 60%;

				&:hover,
				&:focus {
					& > h3 {
						background-color: #191919;
						color: #f7e7ce;
					}

					& > p {
						background-color: #ccc;
						color: #191919;
					}

					&::after {
						color: #191919;
					}
				}
			}

			&--overlayOnScroll {
				z-index: -1;

				& h3,
				& p {
					background-color: #085863;
					color: #085863;
				}
			}

			&--active {
				width: 100%;
				padding: 0;
				margin-bottom: 0;
				margin-left: unset;
				height: auto;
				justify-content: center;

				&::after {
					right: 5%;
					bottom: 3%;
					font-size: 2.5vw;

					pointer-events: none;
					position: absolute;
					content: 'Return';
					color: #ccc;
					font-weight: 400;
					opacity: 0;
					animation: display 0.6s 0.6s forwards;

					transition:
						left 0.9s,
						right 0.9s;

					@media (max-aspect-ratio: 1/1) {
						font-size: 4vw;
						bottom: 5%;
					}
				}

				@media (min-aspect-ratio: 1/1) {
					& > h3 {
						font-size: 2.5vw;
					}

					& > p {
						font-size: 2vw;
					}

					&:hover::after {
						color: #191919;
						right: 35%;
					}
				}
			}
		}
	}
</style>
