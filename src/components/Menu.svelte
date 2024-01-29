<script>
	import { isMobileStore } from '../stores/isMobileStore';
	import { isMenuActive } from '../stores/menuActiveStore';
	import { binaryCode } from '../actions/binaryCode.js';
	import whiteFlame from '../images/white-flames.gif';

	let hoverPhrases = [''];
	let isHovering = false;

	const whoAmIHover = ['I am looking for a permanent position', 'Lyon-based Enterprises, agencies, teams'];
	const theCodeHover = ['The only limit', 'of my dedication to the code', 'is your imagination'];
	const ReachOutHover = ['Have you ever seen a contact form?', 'well, this one is not really different', 'but still', 'reach out!'];

	const showPhrases = phrases => {
		hoverPhrases = phrases;
		if ($isMobileStore.touchSupport) isHovering = false;
		else isHovering = true;
	};

	function hidePhrases() {
		isHovering = false;
	}
</script>

<section class="menu {$isMenuActive ? 'menu--active' : 'menu--inactive'}">
	<div class="menu-container {$isMenuActive ? 'menu-container--active' : ''}">
		<div class="menu-container__main-panel">
			<nav class="nav">
				<ul class="nav-list">
					<li class="nav-list-links">
						<a title="click me" on:mouseover={() => showPhrases(whoAmIHover)} on:focus={() => showPhrases(whoAmIHover)} on:mouseleave={hidePhrases} href="#whoAmI"
							>Hire me</a
						>
					</li>
					<li class="nav-list-links">
						<a title="click me" on:mouseover={() => showPhrases(theCodeHover)} on:focus={() => showPhrases(theCodeHover)} on:mouseleave={hidePhrases} href="#TheCode"
							>The code</a
						>
					</li>
					<li class="nav-list-links">
						<a
							title="click me"
							on:mouseover={() => showPhrases(ReachOutHover)}
							on:focus={() => showPhrases(ReachOutHover)}
							on:mouseleave={hidePhrases}
							href="#ReachOut">Reach out</a
						>
					</li>
				</ul>
			</nav>
		</div>
		<span class="menu-container__separator"></span>
		<div class="menu-container__second-panel">
			{#if isHovering}
				<div use:binaryCode={hoverPhrases} class="nav-list-links__onHoverThings"></div>
			{/if}

			<img
				class="white-flames {isHovering ? 'white-flames--active' : $isMobileStore.touchSupport ? 'white-flames--active' : ''}"
				src={whiteFlame}
				alt="white flame"
			/>
			<span class="question-mark {$isMenuActive ? 'question-mark--active' : ''}">
				<p class="question-mark-text">?</p>
			</span>
		</div>
	</div>
</section>

<style lang="scss">
	@import '../scss/main.scss';

	.menu {
		z-index: 99; // over everything except the button who's 100
		position: fixed;
		top: 5%;
		left: 5%;
		width: 90%;
		height: 80%;
		transform: translateX(100vw);
		perspective: 200px;
		transition: 1s ease-out;

		@media (min-aspect-ratio: 1/1) {
			transform: translateX(-100vw);
			perspective: 200px;
		}

		&--active {
			background-color: rgba(0, 0, 0, 0.3);
			transform: translateX(0);
			opacity: 1;

			@media (min-aspect-ratio: 1/1) {
				width: 80%;
				height: 90%;
			}
		}

		&--inactive {
			background-color: rgb(255, 255, 255);
			opacity: 0;
		}

		&-container {
			position: relative;
			display: flex;
			flex-direction: column;
			width: 100%;
			height: 100%;
			transition: 1s ease-out;
			transform: rotateY(-25deg);

			@media (min-aspect-ratio: 1/1) {
				flex-direction: row;
				transform: rotateY(25deg);
			}

			&--active {
				transform: rotateY(0);
			}

			&__main-panel {
				display: flex;
				flex-direction: column;
				width: 100%;
				height: 100%;
			}

			&__second-panel {
				position: relative;
				display: grid;
				place-items: center;
				background-color: rgb(0, 0, 0);
				width: 100%;
				height: 100%;
			}
		}
	}

	.white-flames {
		width: auto;
		opacity: 0;
		transition: 0.3s;

		@media (min-aspect-ratio: 1/1) {
			width: 100%;
		}

		&--active {
			opacity: 1;
		}
	}

	.question-mark {
		position: absolute;
		height: 50%;
		display: grid;
		place-items: center;
		padding-top: 50%;
		opacity: 0;
		transition: 1s;

		@media (min-aspect-ratio: 1/1) {
			padding-top: 50%;
		}

		&--active {
			opacity: 1;
		}

		&-text {
			font: inherit;
			font-size: calc(8em + 4vw);
			margin-block: unset;
		}
	}

	:is(.nav, .nav-list, .nav-list-links, .nav-list-links a) {
		width: 100%;
		height: 100%;
	}

	.nav {
		z-index: 100;
		&-list {
			padding: unset;
			margin: unset;
			display: flex;
			flex-direction: column;

			&-links {
				list-style: none;
				font: inherit;
				display: grid;
				place-items: center;
				text-align: center;
				width: 100%;
				height: 100%;

				& a {
					width: 98%;
					height: 90%;
					display: grid;
					place-items: center;
					// font-size: calc(2rem + 3vh);
					text-decoration: none;
					background-color: rgb(24, 24, 24);
					color: $primaryCl;
					font-weight: 400;
					transition: 0.3s ease-out;
					box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.57);

					&:hover {
						background-color: rgba(255, 255, 255, 0.7);
						color: rgba(0, 0, 0, 0.8);
					}
				}

				&__onHoverThings {
					position: absolute;
					display: flex;
					justify-content: center;
					width: 100%;
					top: 10%;

					@media (min-aspect-ratio: 1/1) {
						font-size: calc(1em + 0.5vw);
					}
				}
			}
		}
	}
</style>
