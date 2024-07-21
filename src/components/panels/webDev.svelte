<script>
	import { onMount, onDestroy } from 'svelte';
	import { webDev } from '../../actions/webDev';
	import { scrambledText } from '../../actions/scrambledText';
	import { onExitAnim } from '../../actions/onExitAnim';
	import { isMobileStore } from '../../stores/isMobileStore';

	let els;
	const webDevPhrases = ['dedicated', 'future full-stack', 'modular', 'creative', 'passionate', 'relentless'];
	const webDevPhrases2 = ['web', 'French', '27-year-old'];

	let randomNumber = 6;

	const generateRandomNumber = () => {
		let allowedNumbers;
		if ($isMobileStore.aspectRatio) allowedNumbers = [7, 8, 9];
		else allowedNumbers = [4, 5, 6];

		const index = Math.floor(Math.random() * allowedNumbers.length);
		return allowedNumbers[index];
	};
	onMount(() => {
		if (els.childNodes) {
			setInterval(() => {
				randomNumber = generateRandomNumber();
				for (let i = 0; i < els.childNodes.length; i++) {
					const el = els.childNodes[i].firstChild;

					if (el && el.style) {
						el.style.setProperty('--font-factor', `${randomNumber}vw`);
					}
				}
			}, 1500);
		}
	});
</script>

<div class="webDev">
	<div class="webDev-container" bind:this={els}>
		<div class="webDev-container__el" use:onExitAnim>
			<p class="webDev-container__el-text" use:webDev={{ bgColor: '#900C3D' }}>I'm a</p>
		</div>
		<div class="webDev-container__el" use:onExitAnim>
			<p class="webDev-container__el-text" use:webDev={{ bgColor: '#022539' }} use:scrambledText={{ phrases: webDevPhrases, d: 1600 }}>passionated</p>
		</div>
		<div class="webDev-container__el" use:onExitAnim>
			<p class="webDev-container__el-text" use:webDev={{ bgColor: '#7C3498' }} use:scrambledText={{ phrases: webDevPhrases2, d: 1600 }}>french</p>
		</div>
		<div class="webDev-container__el" use:onExitAnim>
			<p class="webDev-container__el-text" use:webDev={{ bgColor: '#085863' }}>developer</p>
		</div>
	</div>
</div>

<style lang="scss">
	.webDev {
		background-color: #191919;
		box-sizing: border-box;
		width: 100%;
		height: 100vh;
		max-height: 100vh;
		display: grid;
		place-items: center;
		overflow: hidden;
	}

	.webDev-container {
		height: 20vw;
		overflow: hidden;
		position: relative;
		display: flex;
		flex-wrap: wrap;

		@media (max-aspect-ratio: 1/1) {
			overflow: unset;
			height: unset;
			flex-direction: column;
			gap: 5vw;
		}

		&__el {
			display: flex;
			height: 50%;
			text-wrap: nowrap;

			@media (min-aspect-ratio: 1/1) {
				overflow: hidden;
			}

			&-text {
				color: white;
				font-size: var(--font-factor, 6vw);
				box-sizing: border-box;
				margin: unset;
			}
		}

		& > div:nth-child(1) {
			justify-content: flex-end;
			align-items: flex-end;
			width: 50%;
		}

		& > div:nth-child(2) {
			align-items: flex-end;
		}

		& > div:nth-child(3) {
			justify-content: flex-end;
			align-items: flex-start;
			width: 50%;
		}

		& > div:nth-child(4) {
			justify-content: flex-start;
			align-items: flex-start;
			width: 50%;
		}

		& > div:nth-child(1) > p {
			opacity: 0.9;
			padding-right: 2%;
			transform: translateY(100%);
			transition: all 0.3s;
		}

		& > div:nth-child(2) > p {
			color: #f7e7ce;
			padding-left: 2%;
			transform: translateX(-100%);
			transition: all 0.3s 0.2s;
		}

		& > div:nth-child(3) > p {
			color: #f7e7ce;
			opacity: 0.9;
			padding-right: 2%;
			transform: translateX(100%);

			transition: all 0.3s 0.6s;
		}

		& > div:nth-child(4) > p {
			opacity: 0.9;
			padding-left: 2%;
			transform: translateY(-100%);

			transition: all 0.3s 0.4s;
		}
	}
</style>
