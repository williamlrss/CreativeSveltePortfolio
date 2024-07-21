export function noise(node) {
	const ctx = node.getContext('2d');

	function resizeCanvas() {
		node.width = node.offsetWidth;
		node.height = node.offsetHeight;
		setNoise();
	}

	// Parameters for noise generation
	const mu = 0; // Mean
	const sigma = 25; // Standard deviation, adjust for more or less contrast
	const opacity = 50; // Adjusted opacity

	const epsilon = 0.01;
	const tau = 2 * Math.PI;
	let z0, z1, generate;

	function generateNoise(mu, sigma) {
		generate = !generate;

		if (!generate) {
			return z1 * sigma + mu;
		}

		let u1, u2;
		do {
			u1 = Math.random();
			u2 = Math.random();
		} while (u1 <= epsilon);

		z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(tau * u2);
		z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(tau * u2);
		return z0 * sigma + mu;
	}

	function setNoise() {
		const imageData = ctx.createImageData(node.width, node.height);
		const data = imageData.data;

		for (let i = 0; i < data.length; i += 4) {
			const noise = generateNoise(mu, sigma);
			data[i] = data[i + 1] = data[i + 2] = noise; // Apply noise to RGB channels
			data[i + 3] = opacity; // Alpha channel
		}

		ctx.putImageData(imageData, 0, 0);
	}

	resizeCanvas();

	const debounce = (callback, delay) => {
		let timer;
		return function () {
			clearTimeout(timer);
			timer = setTimeout(callback, delay);
		};
	};

	window.addEventListener('resize', debounce(resizeCanvas, 250));

	return {
		destroy() {
			window.removeEventListener('resize', () => resizeCanvas());
		},
	};
}
