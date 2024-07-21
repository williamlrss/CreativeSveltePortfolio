<script>
	import { isMenuActive } from '../stores/navigationStores';

	let buttonMobile;

	let lockValue = false;

	const toggleActive = e => {
		e.preventDefault();
		if (e.type === 'touchmove') {
			lockValue = true;
			setTimeout(() => {
				lockValue = false;
			}, 300);
		}
		if (e.type !== 'touchmove' && !lockValue) isMenuActive.update(n => !n);
	};
</script>

<button
	on:click={toggleActive}
	on:touchend={!$isMenuActive ? toggleActive : ''}
	on:touchmove={toggleActive}
	class="menuEl--mobile__button"
	bind:this={buttonMobile}
	>{$isMenuActive ? 'EXIT' : 'MENU | CONTACT'}
</button>

<style lang="scss">
	@import '../scss/main.scss';

	.menuEl--mobile__button {
		z-index: 201;
		position: fixed;
		bottom: 0;
		left: 0;
		height: 10%;
		cursor: pointer;
		display: grid;
		place-items: center;

		background-color: #191919;
		color: #f7e7ce;
		font-size: 6vw;
		font-weight: 100;
		width: 100%;
		border-top: 2px solid #f7e7ce;
	}
</style>
