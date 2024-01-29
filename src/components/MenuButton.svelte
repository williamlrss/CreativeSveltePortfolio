<script>
	import { magnetEffect } from '../actions/magnetEl.js';
	import { scrollStore } from '../stores/scrollStore.js';
	import { isMenuActive } from '../stores/menuActiveStore.js';

	const toggleActive = () => {
		isMenuActive.update(n => !n);
	};

	let letterSpacing = '160';

	$: if ($isMenuActive) {
		letterSpacing = '-13';
	} else {
		letterSpacing = '160';
	}
</script>

<div class="menuEl" use:magnetEffect>
	<div class="menuEl-magnetEffect">
		<button
			class="menuEl__button"
			on:click={toggleActive}
			class:active={$isMenuActive}
			style="border-color: {$isMenuActive ? 'hsl(0deg 100% 50% / 20%)' : 'rgba(247, 231, 206, 0.25)'};"
		>
			<span class="menuEl__button-icon">
				<svg
					version="1.1"
					id="Layer_1"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					x="0px"
					y="0px"
					viewBox="0 0 100 95"
					style="enable-background:new 0 0 100 95;"
					xml:space="preserve"
				>
					<path
						class="menuEl__button-icon__svg {$isMenuActive ? 'inactiveIcon' : 'activeIcon'}"
						id="menuInactive"
						d="M2.5,13c0-0.9,0.6-1.5,1.5-1.5H96c0.9,0,1.5,0.6,1.5,1.5c0,0.9-0.6,1.5-1.5,1.5H4C3.1,14.6,2.5,13.9,2.5,13z
	 M96,80.4H4c-0.9,0-1.5,0.6-1.5,1.5c0,0.9,0.6,1.5,1.5,1.5H96c0.9,0,1.5-0.6,1.5-1.5C97.5,81.1,96.9,80.4,96,80.4z M96,46H4
	c-0.9,0-1.5,0.6-1.5,1.5C2.5,48.4,3.1,49,4,49H96c0.9,0,1.5-0.6,1.5-1.5C97.5,46.6,96.9,46,96,46z"
					/>
					<path
						class="menuEl__button-icon__svg {$isMenuActive ? 'activeIcon' : 'inactiveIcon'}"
						id="menuActive"
						d="M96.8,0.7c-0.9-0.9-2.3-0.9-3.2,0L50,44.3L6.4,0.7c-0.9-0.9-2.3-0.9-3.2,0C2.3,1.6,2.3,3,3.2,3.9l43.6,43.6
	L3.2,91.1c-0.9,0.9-0.9,2.3,0,3.2c0.9,0.9,2.3,0.9,3.2,0L50,50.7l43.6,43.6c0.9,0.9,2.3,0.9,3.2,0c0.9-0.9,0.9-2.3,0-3.2L53.2,47.5
	L96.8,3.9C97.7,3,97.7,1.6,96.8,0.7z"
						style="opacity: 0"
					/>
				</svg>
			</span>
			<svg viewBox="0 0 200 200" width="300%" height="300%" class="menuEl__button-svg" aria-labelledby="link1-title link1-desc">
				<title id="link1-title">Menu, three items navigation</title>
				<desc id="link1-desc">A menu button with rotating bars placed around a circle</desc>

				<path id="link-circle" class="link__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
				<text class="menuEl__button-text rotating-path" style="--rotate-degrees: {$scrollStore.scrollY / -3}deg">
					<textPath href="#link-circle" stroke="none">
						<tspan class="tspan" style="word-spacing: {letterSpacing}px;">| | | | | | | | | | | | | | | | | | | | | | | |</tspan></textPath
					>
				</text>
			</svg>
		</button>
	</div>
</div>

<style lang="scss">
	@import '../scss/main.scss';

	.tspan {
		word-spacing: 160px;
		transition: 1.4s;
	}

	.menuEl {
		z-index: 100; // over everything
		position: fixed;
		display: grid;
		place-items: center;
		bottom: 5%;
		scale: 1.5;
		border-radius: 50%;
		width: 15em;
		aspect-ratio: 1;

		@media (min-aspect-ratio: 1/1) {
			right: 3%;
			bottom: 25%;
			scale: 1.1;
		}

		&-magnetEffect {
			display: grid;
			place-items: center;
			transform: translate(var(--tx, 0), var(--ty, 0));
			transition: all 0.2s ease-out;
		}

		&__button {
			font: inherit;
			width: 4em;
			aspect-ratio: 1;
			background: none;
			border-radius: 50%;
			border: 2px dashed #ffffffc8;
			opacity: 0.5;
			cursor: pointer;
			transition: all 0.2s ease-out;

			&:focus-visible,
			&:hover {
				opacity: 1;
				border: 3px solid;
			}

			&-icon {
				position: relative;
				display: grid;
				place-items: center;

				&__svg {
					fill: white;
					scale: 0.5;
					transform-origin: center;
					position: absolute;
				}
			}

			&-svg {
				position: absolute;
				top: -100.7%;
				right: -49.7%;
				width: 200%;
				fill: $primaryCl;
				transition: 0.3s;
			}

			&-text {
				overflow: visible;
				font-size: 2em;
				transform-origin: center;

				transform: rotate(var(--rotate-degrees));
				transition: transform 0.3s ease-out;
			}
		}
	}

	.active {
		opacity: 0.8;

		& .menuEl__button-text {
			animation: disapear 1.5s forwards ease-in;
		}
	}

	.activeIcon {
		animation: active 0.3s forwards;
		display: block;
	}

	.inactiveIcon {
		animation: inactive 0.3s forwards;
		display: block;
	}

	@keyframes disapear {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes rotate {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes rotateReverse {
		to {
			transform: rotate(-360deg);
		}
	}

	@keyframes active {
		from {
			opacity: 0;
			scale: 0;
		}
		to {
			opacity: 1;
			scale: 0.5;
		}
	}

	@keyframes inactive {
		from {
			opacity: 1;
			scale: 0.5;
		}
		to {
			opacity: 0;
			scale: 0;
		}
	}
</style>
