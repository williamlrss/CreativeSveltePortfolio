<script>
	import { onMount, onDestroy } from 'svelte';
	import { writable } from 'svelte/store';

	// STORES
	import { isMobileStore } from '../stores/isMobileStore'; // based on ratio and / or touch support detection

	// NAVIGATION STATES
	import { isMenuActive, navItemActive, hireMeItemActive, myCodeItemActive } from '../stores/navigationStores';

	// ACTIONS
	import { setAccurateViewportHeight } from '../actions/setAccurateViewportHeight'; // responsive to browser's interface height (mobile devices)
	import { fontSizer } from '../actions/fontSizer'; // responsive to container dimensions

	// ASSETS
	import cubicEls from '../assets/images/cubicEls.png'; // background
	import me from '../assets/images/williamlrss.jpg';

	// NAV COMPONENTS
	import Credits from './navItems/Credits.svelte';
	import MyCode from './navItems/TheCode.svelte';

	$: if ($isMenuActive) document.body.classList.add('no-scroll');
	else document.body.classList.remove('no-scroll');

	const topics = ['Hire me', 'The code', 'Credits'];
	const desc = ['My profile on Notion (french)', 'Scripts of this website', 'Code from others'];

	// NAV PROCESS
	const positioning = writable(['0', '0', '0']);
	const setTranslation = () => {
		if ($navItemActive === 0) {
			positioning.set(['0', '0', '0']); // In %
		} else if ($navItemActive === 1) {
			positioning.set(['33', '33;', '33']);
		} else if ($navItemActive === 2) {
			positioning.set(['66', '66', '66']);
		}
		setTimeout(() => {
			if ($navItemActive != null) {
				positioning.set(['0', '0', '0']);
			}
		}, 600);
	};

	let waitAndRender = false;

	const selectNavItem = index => {
		if (index === $navItemActive) {
			// Return
			$navItemActive = null;
		} else {
			// Select the unselected
			if (index === 0) return;
			else {
				$navItemActive = index;
				setTimeout(() => {
					if ($navItemActive != null) {
						waitAndRender = true;
					}
				}, 900);
			}
		}
	};

	$: if ($navItemActive === null) {
		waitAndRender = false;
		positioning.set(['0', '33', '66']);
	} else {
		setTranslation();
	}

	let lockValue = false;

	// Forbid return-back-to-navigation when navigating within nav
	$: if ($hireMeItemActive != null || $myCodeItemActive != null) {
		lockValue = true;
	} else {
		setTimeout(() => {
			lockValue = false;
		}, 200);
	}

	const returnOnEscape = event => {
		if (!lockValue && event.key !== 'Backspace')
			if (event.key === 'Escape' && $navItemActive !== null) $navItemActive = null;
			else if (event.key === 'Escape' && $isMenuActive && $navItemActive === null) isMenuActive.update(n => !n);
	};

	onMount(() => {
		document.addEventListener('keydown', returnOnEscape);
	});

	onDestroy(() => {
		document.removeEventListener('keydown', returnOnEscape);
	});
</script>

<section class="menu {$isMenuActive ? 'menu--active' : 'menu--inactive'}" class:menu--myCodeActive={$navItemActive === 1} use:setAccurateViewportHeight>
	<div
		max-height={$navItemActive === null && $isMobileStore.aspectRatio ? '100%' : '50%'}
		max-witdh={$navItemActive === null && $isMobileStore.aspectRatio ? '50%' : '100%'}
		class:menu-container--active={$isMenuActive}
		class="menu-container"
	>
		{#if $isMenuActive}
			<section class="menu-container__main-panel {$navItemActive != null ? 'menu-container__main-panel--active' : 'menu-container__main-panel--inactive'}">
				{#if $navItemActive === 1 && waitAndRender}
					<MyCode />
				{:else if $navItemActive === 2 && waitAndRender}
					<Credits />
				{/if}

				<nav class="nav" class:nav--active={$navItemActive != null}>
					{#each [0, 1, 2] as index}
						<button
							on:click={() => selectNavItem(index)}
							class:nav-item--active={index === $navItemActive}
							class:nav-item--inactive={($navItemActive != null && index !== $navItemActive) || $hireMeItemActive != null}
							class:nav-item--inactive--second={$hireMeItemActive != null || $myCodeItemActive != null}
							tabindex={($navItemActive != null && index !== $navItemActive) || $hireMeItemActive != null || $myCodeItemActive != null ? '-1' : '0'}
							class="nav-item"
							style="--topPos: {$positioning[index]}%"
							disabled={index === 0}
							use:fontSizer={{ h: true, p: $isMobileStore.aspectRatio ? 25 : 21 }}
						>
							{topics[index]}
							<br />
							{#if index === 1 || index === 2}
								<p style="scale: 0.6;">{desc[index]}</p>
							{/if}
						</button>
					{/each}
				</nav>
			</section>

			<section class="menu-container__second-panel" class:menu-container__second-panel--inactive={$navItemActive != null}>
				{#if !$isMobileStore.aspectRatio}
					<img
						class="menu-container__second-panel-background"
						class:menu-container__second-panel-background--inactive={$navItemActive != null}
						src={cubicEls}
						alt="white flame"
					/>
				{/if}
				{#if $navItemActive === null}
					<div class="menu-container__second-panel__contact">
						<img class="menu-container__second-panel__contact-img" src={me} alt="Photo_Professionnelle_de_William_Lerossignol" />

						<div class="contact-container">
							<a class="contact-container-item" href="tel:+33668860800" use:fontSizer={{ w: true, p: $isMobileStore.aspectRatio ? 9 : 7 }}>06 68 86 08 00</a>
							<a
								class="contact-container-item"
								target="_blank"
								href="https://www.linkedin.com/in/williamlerossignol/"
								use:fontSizer={{ w: true, p: $isMobileStore.aspectRatio ? 9 : 7 }}>in/williamlerossignol</a
							>
							<a class="contact-container-item" href="mailto:williamlerossignol@outlook.com" use:fontSizer={{ w: true, p: $isMobileStore.aspectRatio ? 9 : 7 }}
								>williamlerossignol<br />@outlook.com</a
							>
						</div>
					</div>
				{/if}
			</section>
		{/if}
	</div>
</section>

<style lang="scss">
	@import '../scss/main.scss';

	.menu {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: calc(var(--vh, 1vh) * 90); // see setAccurateHeight import

		will-change: transform;

		@media (max-aspect-ratio: 1/1) {
			transition: 0.3s ease-out;
		}

		@media (min-aspect-ratio: 1/1) {
			top: 5%;
			left: 5%;
			width: 80%;
			height: 90%;
			perspective: 200px;
		}

		&--active {
			z-index: 99; // over everything except the button (100)
			opacity: 1;
			transition:
				all 1s 0.6s ease-out,
				z-index 0.1s;

			@media (max-aspect-ratio: 1/1) {
				transition:
					all 0.3s ease-out,
					z-index 0.1s;
			}
		}

		&--myCodeActive {
			@media (min-aspect-ratio: 1/1) {
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
			}
		}

		&--inactive {
			opacity: 0;
			transition: all 0.3s ease-out;
			pointer-events: none;
			z-index: -1;
		}

		&-container {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			transition: 1s ease-out;
			background: #ccccccde;

			@media (min-aspect-ratio: 1/1) {
				flex-direction: row;
			}

			&__main-panel {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 60%;
				scale: 0.9;
				transition:
					all 0.3s,
					scale 1.2s 0.6s;

				@media (min-aspect-ratio: 1/1) {
					height: 100%;
					width: 60%;
				}

				&--active {
					width: 100%;
					height: 100%;
					scale: 1;
					background-color: #191919;
				}
			}

			&__second-panel {
				position: relative;
				display: flex;
				flex-direction: column;
				justify-content: flex-end;
				width: 100%;
				height: 40%;

				transition:
					opacity 0.3s ease-in,
					width 0.6s 0.3s,
					height 0.6s;

				@media (min-aspect-ratio: 1/1) {
					display: grid;
					place-items: center;
					align-items: start;
					width: 40%;
					height: 100%;
				}

				&--inactive {
					opacity: 0;
					width: 0;
					height: 0;
				}

				&-background {
					overflow: hidden;
					z-index: 100;
					pointer-events: none;
					position: absolute;
					opacity: 0.1;

					width: 100%;
					height: 140vh;
					object-fit: cover;
					transition: all 0.2s;

					&--inactive {
						opacity: 0;
					}
				}

				&__contact {
					position: absolute;
					z-index: 101;
					display: flex;
					flex-direction: row;

					width: 80%;
					height: 100%;
					margin-inline: 10%;

					@media (min-aspect-ratio: 1/1) {
						flex-direction: column;
						gap: 10px;
						width: 90%;
						height: 75vh;
						margin-inline: unset;
						margin-top: 5vh;
					}

					&-img {
						box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
						align-self: start;
						object-fit: cover;
						height: 100%;
						width: 40%;

						opacity: 0;
						animation: display 0.3s 0.3s forwards;

						@media (min-aspect-ratio: 1/1) {
							scale: 0.9;
							height: 40%;
							width: 100%;
							object-position: 0% 45%;
						}
					}
				}
			}
		}
	}

	.contact-container {
		display: flex;
		flex-direction: column;
		align-items: center;

		width: 100%;
		height: 100%;

		@media (min-aspect-ratio: 1/1) {
			gap: 10px;
		}

		&-item {
			display: grid;
			align-items: center;
			width: 90%;
			height: 30%;

			background-color: rgba(255, 255, 255, 0.3);
			color: #191919;
			font-weight: 700;
			padding: 10px;

			scale: 0.9;

			@media (max-aspect-ratio: 1/1) {
				height: 25%;
				box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
			}

			@media (min-aspect-ratio: 1/1) {
				width: 100%;
				box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
			}

			&:hover {
				box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);
			}
		}
	}

	@keyframes display {
		from {
			opacity: 0;
			transform: translateX(0);
		}
		to {
			opacity: 1;
		}
	}

	.nav {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		transition: height 0.9s 0.3s;

		&--active {
			height: 0;
		}

		&-item {
			position: absolute;
			z-index: 1;
			font: inherit;
			display: grid;
			place-items: center;
			text-align: center;
			align-content: center;
			width: 100%;
			min-height: 48px;
			height: 30%;
			scale: 0.9;

			background-color: #191919;
			color: #f7e7ce;
			font-weight: 400;
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);
			border: 2px solid transparent;

			opacity: 1;
			transition:
				background-color 0.1s,
				color 0.1s,
				top 0.9s 0.3s ease-out,
				opacity 0.3s 0.4s,
				scale 0.3s,
				transform 0.9s,
				height 0.9s;

			will-change: transform color opacity;

			&:nth-child(1) {
				top: var(--topPos, 0);
				background-color: #ccc;
				color: #191919;
				box-shadow: unset;
			}

			&:nth-child(2) {
				top: var(--topPos, 33%);
			}

			&:nth-child(3) {
				top: var(--topPos, 66%);
			}

			&:nth-child(2),
			&:nth-child(3) {
				cursor: pointer;
			}

			&:nth-child(2):hover,
			&:nth-child(3):hover {
				color: #191919;
				background-color: transparent;
				border: 2px solid #f7e7ced8;
			}

			&--active {
				background-color: #191919;
				border-radius: 0%;
				backdrop-filter: blur(2px);
				color: #f7e7ced8;
				height: 15%;

				@media (min-aspect-ratio: 1/1) {
					height: 20%;
				}

				&::before,
				&::after {
					pointer-events: none;
					position: absolute;
					content: 'Return';
					color: #f7e7ce9f;
					font-weight: 400;
					opacity: 0;
					animation: display 0.6s 0.6s forwards;

					transition:
						left 0.9s,
						right 0.9s;
				}

				&::before {
					transform: scaleX(-1);
					left: 5%;
				}

				&::after {
					right: 5%;
				}

				&:hover {
					color: transparent;

					&::before {
						left: 15%;
						color: #191919;
					}

					&::after {
						right: 15%;
						color: #191919;
					}

					@media (min-aspect-ratio: 1/1) {
						&::before {
							left: 35%;
						}

						&::after {
							right: 35%;
						}
					}
				}
			}

			&--inactive {
				z-index: 0;
				pointer-events: none;
				opacity: 0;
				scale: 0.6;
			}

			&--inactive--second {
				scale: 0.9;
				transform: translateY(-200%);
			}
		}
	}
</style>
