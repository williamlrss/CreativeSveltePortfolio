<script context="module">
	import { isMobileDevice } from '../stores/isMobileStore';

	export function magnetEffect(node) {
		const moveListener = e => {
			// get element properties (witdh, height, distance from screen-width / height)
			const rect = node.getBoundingClientRect();

			// radius
			const h = rect.width / 2;

			// mouse distance from (left and top radius --> element x and y axis)
			const x = e.clientX - rect.left - h;
			const y = e.clientY - rect.top - h;

			const r1 = Math.sqrt(x * x + y * y);
			const r2 = (1 - r1 / h) * r1;

			const angle = Math.atan2(y, x);
			const tx = Math.round(Math.cos(angle) * r2 * 100) / 80;
			const ty = Math.round(Math.sin(angle) * r2 * 100) / 80;

			node.style.setProperty('--tx', `${tx}px`);
			node.style.setProperty('--ty', `${ty}px`);
		};

		const leaveListener = e => {
			node.style.setProperty('--tx', '0px');
			node.style.setProperty('--ty', '0px');
		};

		node.addEventListener('mousemove', moveListener);
		node.addEventListener('mouseleave', leaveListener);

		return {
			destroy() {
				node.removeEventListener('mousemove', moveListener);
				node.removeEventListener('mouseleave', leaveListener);
			},
		};
	}
</script>

<div class={$isMobileDevice ? 'magnet-inactive' : 'magnet'} use:magnetEffect>
	<div class={$isMobileDevice ? 'magnet-el-inactive' : 'magnet-el'}>
		<slot />
	</div>
</div>

<style lang="scss">
	.magnet {
		display: grid;
		place-items: center;
		width: 15em;
		aspect-ratio: 1;
		border-radius: 50%;

		&-inactive {
			margin: 2em;
		}

		&-el {
			display: grid;
			place-items: center;
			transform: translate(var(--tx, 0), var(--ty, 0));
			transition: all 0.2s ease-out;

			&-inactive {
				display: grid;
				place-items: center;
				transform: translate(0);
			}
		}
	}
</style>
