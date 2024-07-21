export function scrambledText(node, params) {
	// !<>-_\\/[]{}—=+*^?#________
	const chars = '01010101010101|_________';
	let queue = [];
	let frame = 0;
	let frameRequest;
	let resolve;

	const phrases = params.phrases;
	const d = params.d;

	function setText(newText) {
		const oldText = node.innerText;
		const length = Math.max(oldText.length, newText.length);
		const promise = new Promise(res => (resolve = res));
		queue = [];
		for (let i = 0; i < length; i++) {
			const from = oldText[i] || '';
			const to = newText[i] || '';
			const start = Math.floor(Math.random() * 40);
			const end = start + Math.floor(Math.random() * 40);
			queue.push({ from, to, start, end, char: null });
		}
		cancelAnimationFrame(frameRequest);
		frame = 0;
		update();
		return promise;
	}

	function update() {
		let output = '';
		let complete = 0;
		queue.forEach((item, index) => {
			let { from, to, start, end, char } = item;
			if (frame >= end) {
				complete++;
				output += to;
			} else if (frame >= start) {
				if (!char || Math.random() < 0.28) {
					char = randomChar();
					queue[index].char = char;
				}
				output += `<span style="color: #f7e7ce">${char}</span>`;
			} else {
				output += from;
			}
		});
		node.innerHTML = output;
		if (complete === queue.length) {
			resolve();
		} else {
			frameRequest = requestAnimationFrame(update);
			frame++;
		}
	}

	function randomChar() {
		return chars[Math.floor(Math.random() * chars.length)];
	}

	let counter = 0;
	function next() {
		setText(phrases[counter]).then(() => {
			setTimeout(next, d);
		});
		counter = (counter + 1) % phrases.length;
	}

	next();

	return {
		destroy() {
			cancelAnimationFrame(frameRequest);
		},
	};
}
