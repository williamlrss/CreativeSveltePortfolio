<script>
	import { title, author, codepen, website } from '../../scripts/credits';
	import { scrambledText } from '../../actions/scrambledText';
	import { magnetEffect } from '../../actions/magnetEl';

	const phrases = ['Text Scrambled Effect'];
</script>

<section class="credits">
	<h3 class="credits-intro">Indirect contributions to this project</h3>
	{#each [0, 1, 2] as index}
		<article class="credits-card">
			<div class="credits-card-heading">
				<div class="credits-card-heading-content">
					{#if index === 0}
						<h3 class="sr-only">Text Scrambled Effect</h3>
						<p aria-hidden="true" aria-label="Text Scrambled Effect" class="credits-card-heading-content__title" use:scrambledText={{ phrases: phrases, d: 800 }}>
							Text Scrambled Effect
						</p>
					{:else}
						<h3 class="credits-card-heading-content__title">{title[index]}</h3>
					{/if}
				</div>
				{#if index === 1}
					<div class="menuEl" use:magnetEffect>
						<p style="position: absolute; font-size: 2.5vw; transform: translateY(-200%);">Y</p>
						<p style="position: absolute; font-size: 2.5vw; transform: translateX(-380%);">X</p>
						<button class="menuEl__button"></button>
					</div>
				{/if}
				{#if index === 2}
					<div class="menuEl">
						<button class="menuEl__button">
							<svg viewBox="0 0 200 200" width="300%" height="300%" class="menuEl__button-svg" aria-labelledby="link1-title link1-desc">
								<title id="link1-title">A menu button with rotating text placed around a circle</title>

								<path id="link-circle" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
								<text class="menuEl__button-svg__text rotating-path">
									<textPath xlink:href="#link-circle" stroke="none">
										<tspan class="tspan" style="font-size: 2em; font-weight: 900; word-spacing: 2px;">This is a rotating text around a button</tspan>
									</textPath>
								</text>
							</svg>
						</button>
					</div>
				{/if}
			</div>
			<a href={website[index]} class="credits-card__link" target="_blank">Author professional website "{website[index]}"</a>
			<div class="credits-card-content">
				<a href={codepen[index]} class="credits-card__link" target="_blank">CodePen original content</a>
				<p class="credits-card-content__author">Thank you {author[index]}</p>
			</div>
		</article>
	{/each}
</section>

<style lang="scss">
	@import '../../scss/main.scss';

	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		margin: -1px;
		padding: 0;
		overflow: hidden;
		clip: rect(0, 0, 0, 0);
		border: 0;
		white-space: nowrap;
	}

	@keyframes display {
		0% {
			opacity: 0;
		}
		50% {
			opacity: 0;
			pointer-events: none;
		}
		100% {
			opacity: 1;
			pointer-events: unset;
		}
	}

	.menuEl {
		position: relative;
		display: grid;
		place-items: center;
		bottom: 5%;
		border-radius: 50%;
		aspect-ratio: 1;
		opacity: 0.8;
		width: 10em;
		height: 10em;

		@media (min-aspect-ratio: 1/1) {
			width: 20em;
			height: 20em;
			right: 3%;
			bottom: 25%;
		}

		&__button {
			transform: translate(var(--tx, 0), var(--ty, 0));
			font: inherit;
			width: 10vw;
			height: 10vw;
			background: none;
			border-radius: 50%;
			border: 5px dashed #191919;
			border-width: 3px;

			@media (min-aspect-ratio: 1/1) {
				width: 6vw;
				height: 6vw;
			}

			&-svg {
				position: absolute;
				top: -100.7%;
				right: -49.7%;
				width: 200%;

				&__text {
					animation: rotate 2s infinite;
					transform-origin: center;
				}
			}
		}
	}

	@keyframes rotate {
		from {
			transform: rotate(0deg);
		}
		to {
			transform: rotate(360deg);
		}
	}

	.credits {
		display: flex;
		flex-direction: column;
		gap: 2vw;
		overflow-x: hidden;
		overflow-y: scroll;
		width: 100%;
		height: 100%;
		padding-top: 15vh;
		background-color: #ccc;

		animation: display 0.9s;

		@media (min-aspect-ratio: 1/1) {
			padding-top: 20vh;
			height: 80%;
		}

		&-intro {
			padding: 4vw 8vw;
			width: 100%;
			margin-bottom: 10px;
			box-sizing: border-box;
			color: #191919;

			font-size: 4vw;

			@media (min-aspect-ratio: 1/1) {
				font-size: 2vw;
			}
		}

		&-card {
			padding: 8vw;
			margin-bottom: 10px;
			box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.325);
			border: 2px solid transparent;
			width: 100%;
			box-sizing: border-box;
			align-content: center;
			color: #191919;
			background-color: #dedede;
			animation: display 0.3s 0.1s forwards;

			&-content__author,
			&__link {
				margin-top: 2vw;
				font-size: 4vw;

				@media (min-aspect-ratio: 1/1) {
					font-size: 2vw;
				}
			}

			&-heading {
				display: flex;
				justify-content: space-between;
				align-items: center;

				&-content {
					width: 70%;
					&__title {
						color: #191919;
						text-align: start;
					}

					&__title {
						color: #191919;
						font-size: 6vw;
						@media (min-aspect-ratio: 1/1) {
							font-size: 2.5vw;
						}
					}
				}
			}

			&__link {
				cursor: pointer;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
				text-decoration: none;
				gap: 1vw;
				padding: 1vw;
				background-color: #191919;
				color: #f7e7ce;
				font-weight: 500;
				box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);

				transition: all 0.1s;

				&:hover {
					background-color: transparent;
					color: #191919;
				}
			}

			&-content {
				box-sizing: border-box;
				width: 100%;
				display: flex;
				justify-content: flex-start;
				gap: 1vw;

				&__author {
					width: 100%;
					color: #191919;
					text-align: center;
					align-self: center;
				}
			}
		}
	}
</style>
