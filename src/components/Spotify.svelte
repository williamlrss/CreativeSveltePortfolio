<script>
	import { isSpotifyActive } from '../stores/isSpotifyActive';

	const spotifyDisplay = () => {
		console.log('test');
		isSpotifyActive.update(n => !n);

		console.log($isSpotifyActive);
	};
</script>

<!-- width="200%" height="200%" -->

<button on:click={spotifyDisplay} on:touchend={spotifyDisplay} class="spotify__btn" class:spotify__btn--active={$isSpotifyActive}>
	<svg
		width="100%"
		height="100%"
		viewBox="0 0 24 24"
		class="spotify__btn-icon"
		class:spotify__btn-icon--active={$isSpotifyActive}
		xmlns="http://www.w3.org/2000/svg"
		fill-rule="evenodd"
		clip-rule="evenodd"
		><path
			d="M19.098 10.638c-3.868-2.297-10.248-2.508-13.941-1.387-.593.18-1.22-.155-1.399-.748-.18-.593.154-1.22.748-1.4 4.239-1.287 11.285-1.038 15.738 1.605.533.317.708 1.005.392 1.538-.316.533-1.005.709-1.538.392zm-.126 3.403c-.272.44-.847.578-1.287.308-3.225-1.982-8.142-2.557-11.958-1.399-.494.15-1.017-.129-1.167-.623-.149-.495.13-1.016.624-1.167 4.358-1.322 9.776-.682 13.48 1.595.44.27.578.847.308 1.286zm-1.469 3.267c-.215.354-.676.465-1.028.249-2.818-1.722-6.365-2.111-10.542-1.157-.402.092-.803-.16-.895-.562-.092-.403.159-.804.562-.896 4.571-1.045 8.492-.595 11.655 1.338.353.215.464.676.248 1.028zm-5.503-17.308c-6.627 0-12 5.373-12 12 0 6.628 5.373 12 12 12 6.628 0 12-5.372 12-12 0-6.627-5.372-12-12-12z"
		/></svg
	>
</button>

<div class="spotify" class:spotify--active={$isSpotifyActive}>
	<div class="spotify-container">
		<iframe
			class="spotify-container__player"
			title="my on loop Spotify playlist"
			style="border-radius:12px"
			src="https://open.spotify.com/embed/playlist/37i9dQZF1Eprr4MNPYrN4U?utm_source=generator&theme=0"
			frameBorder="0"
			allowfullscreen=""
			allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
			loading="lazy"
		></iframe>
	</div>
</div>

<style lang="scss">
	@import '../scss/main.scss';

	.spotify {
		z-index: 2;
		position: fixed;
		bottom: 0;
		height: 80px;
		width: 340px;
		left: 30px;
		bottom: 45%;
		transform: translateY(50%) translateX(-15px);
		box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
		border-radius: 15px;

		display: flex;
		justify-content: center;

		opacity: 0;
		transition:
			transform 0.4s ease-in,
			opacity 0.4s ease-in;

		@media screen and (max-aspect-ratio: 1/1) {
			width: 98%;
			left: 50%;
			bottom: 17%;
			transform: translateY(70%) translateX(-50%);
		}

		&--active {
			transform: translateY(55%) translateX(0);
			opacity: 1;

			@media screen and (max-aspect-ratio: 1/1) {
				transform: translateY(50%) translateX(-50%);
			}
		}

		&__btn {
			z-index: 3;
			cursor: pointer;
			position: fixed;
			bottom: 45%;
			transform: translateY(55%);
			left: 40px;
			width: 65px;
			height: 65px;
			padding: 15px;
			box-shadow: -7px 7px 14px -1px rgba(0, 0, 0, 0.3);
			border-radius: 5px;
			background-color: #1ed760;

			transition:
				background-color 0.2s,
				scale 0.1s;

			@media screen and (max-aspect-ratio: 1/1) {
				bottom: 11.5%;
				transform: translateY(0);
				left: 10px;
			}

			&:hover {
				scale: 1.1;
			}

			&--active {
				background-color: transparent;
			}

			&-icon {
				fill: black;
				filter: drop-shadow(-7px 7px 14px -1px rgba(0, 0, 0, 0.3));

				transition: fill 0.4s ease-in;

				&--active {
					fill: #1ed760;
				}
			}
		}

		&-container {
			display: contents;

			&__player {
				width: 100%;
				height: 80px;
			}
		}
	}
</style>
