import { isMobileStore } from '../stores/isMobileStore';

export function magnetEffect(node, touchSupport) {
	const unsubscribe = isMobileStore.subscribe(value => {
		touchSupport = value.touchSupport;
	});

	const moveListener = e => {
		const rect = node.getBoundingClientRect();
		const h = rect.width / 2;
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
		update({ touchSupport }) {
			if (touchSupport === true) {
				node.removeEventListener('mousemove', moveListener);
				node.removeEventListener('mouseleave', leaveListener);
			} else {
				node.addEventListener('mousemove', moveListener);
				node.addEventListener('mouseleave', leaveListener);
			}
		},
		destroy() {
			node.removeEventListener('mousemove', moveListener);
			node.removeEventListener('mouseleave', leaveListener);
			unsubscribe();
		},
	};
}
