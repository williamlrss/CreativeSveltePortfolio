<script>
	import { writable } from 'svelte/store';
	import { magnetEffect } from '../actions/magnetEl.js';
	import { isMenuActive } from '../stores/navigationStores.js';
	import { navItemActive } from '../stores/navigationStores.js';

	let menuButton;

	let onToggle = writable(false);

	const toggleActive = () => {
		isMenuActive.update(n => !n);

		onToggle.update(n => !n);
		setTimeout(() => {
			onToggle.update(n => !n);
		}, 500);
	};

	let letterSpacing = '160';

	$: if ($isMenuActive) {
		letterSpacing = '-13';
	} else {
		letterSpacing = '160';
	}
</script>

<div class="menuEl" class:menuEl--theCode={$navItemActive === 1 && $isMenuActive} use:magnetEffect>
	<button
		type="button"
		title="menu"
		class="menuEl__button"
		on:click={toggleActive}
		on:touchend={!$isMenuActive ? toggleActive : ''}
		class:menuEl__button--active={$isMenuActive}
		class:menuEl__button--toggleHeight={$onToggle}
		bind:this={menuButton}
	>
		<span class="menuEl__button-icon">
			<svg
				version="1.1"
				id="menuIcon"
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
					id="menuIcon"
					d="M2.5,13c0-0.9,0.6-1.5,1.5-1.5H96c0.9,0,1.5,0.6,1.5,1.5c0,0.9-0.6,1.5-1.5,1.5H4C3.1,14.6,2.5,13.9,2.5,13z
	 M96,80.4H4c-0.9,0-1.5,0.6-1.5,1.5c0,0.9,0.6,1.5,1.5,1.5H96c0.9,0,1.5-0.6,1.5-1.5C97.5,81.1,96.9,80.4,96,80.4z M96,46H4
	c-0.9,0-1.5,0.6-1.5,1.5C2.5,48.4,3.1,49,4,49H96c0.9,0,1.5-0.6,1.5-1.5C97.5,46.6,96.9,46,96,46z"
				/>
				<path
					class="menuEl__button-icon__svg {$isMenuActive ? 'activeIcon' : 'inactiveIcon'}"
					class:menuEl__button-icon__svg--theCode={$navItemActive === 1 && $isMenuActive}
					id="menuIcon"
					d="M96.8,0.7c-0.9-0.9-2.3-0.9-3.2,0L50,44.3L6.4,0.7c-0.9-0.9-2.3-0.9-3.2,0C2.3,1.6,2.3,3,3.2,3.9l43.6,43.6
	L3.2,91.1c-0.9,0.9-0.9,2.3,0,3.2c0.9,0.9,2.3,0.9,3.2,0L50,50.7l43.6,43.6c0.9,0.9,2.3,0.9,3.2,0c0.9-0.9,0.9-2.3,0-3.2L53.2,47.5
	L96.8,3.9C97.7,3,97.7,1.6,96.8,0.7z"
				/>
				<!-- style="opacity: 0" -->
			</svg>
		</span>
		<!-- <svg
			viewBox="0 0 200 200"
			width="300%"
			height="300%"
			class="menuEl__button-svg"
			class:menuEl__button-svg--projectsActive={($isScrollXActive || $isScrollXJobActive) && !$isMenuActive}
			aria-labelledby="link1-title link1-desc"
		>
			<title id="link1-title">Menu, three items navigation</title>
			<desc id="link1-desc">A menu button with rotating bars placed around a circle</desc>

			<path id="link-circle" class="link__path" d="M 20, 100 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0" stroke="none" fill="none" />
			<text class="menuEl__button-text rotating-path" style="--rotate-degrees: {$scrollStore.scrollY / -12}deg">
				<textPath href="#link-circle" stroke="none">
					<tspan class="tspan" style="word-spacing: {letterSpacing}px;">| | | | | | | | | | | | | | | | | | | | | | | |</tspan></textPath
				>
			</text>
		</svg> -->
	</button>
	<!-- </div> -->
	<p class="menuEl__title" class:menuEl__title--theCode={$navItemActive === 1 && $isMenuActive}>Menu | Contact</p>
</div>

<style lang="scss">
	@import '../scss/main.scss';

	// .tspan {
	// 	word-spacing: 160px;
	// 	transition: 1.4s;
	// }

	.menuEl {
		z-index: 100;
		position: fixed;
		display: grid;
		place-items: center;
		border-radius: 50%;
		border-radius: 50%;
		width: calc(6vw + 20vh);
		height: calc(6vw + 20vh);
		box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.1);

		right: 0;
		bottom: 45%;
		transform: translateY(55%);

		transition: all 0.6s 0.6s;

		&--theCode {
			background-color: rgba(255, 255, 255, 0.7);
		}

		&__title {
			pointer-events: none;
			position: fixed;
			transform: translate(5%, 230%);
			font-size: calc(1vw + 1vh);
			color: #f7e7ce;

			&--theCode {
				color: black;
			}
		}

		&__button {
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
			font: inherit;
			width: 25%;
			height: 25%;
			background: unset;
			border-radius: 50%;
			cursor: pointer;

			transform: translate(var(--tx, 0), var(--ty, 0));
			transition:
				transform 0.15s,
				height 0.5s ease-out,
				border 0.3s;

			&:focus-visible,
			&:hover {
				border: solid #f7e7ce;
			}

			// &--active {
			// 	animation: disapear 1.5s forwards ease-in;
			// }

			// &-text {
			// 	animation: disapear 1.5s forwards ease-in;
			// }

			&--toggleHeight {
				height: 0;
			}

			&-icon {
				position: relative;
				display: grid;
				place-items: center;

				&__svg {
					fill: #f7e7ce;
					scale: 0.5;
					transform-origin: center;
					position: absolute;

					&--theCode {
						fill: black;
					}
				}
			}

			// &-svg {
			// 	pointer-events: none;
			// 	position: absolute;
			// 	top: -100.7%;
			// 	right: -49.7%;
			// 	width: 200%;
			// 	fill: #f7e7ce;
			// 	transition: 0.3s;
			// }

			// &-text {
			// 	pointer-events: none;
			// 	overflow: visible;
			// 	font-size: 2em;
			// 	transform-origin: center;

			// 	transform: rotate(var(--rotate-degrees));
			// 	transition: transform 0.3s ease-out;
			// }
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
