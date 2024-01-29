<script>
	let rx = 0; // Rotation around X-axis
	let ry = 0; // Rotation around Y-axis

	// Listen to mouse move on the entire window
	window.addEventListener('mousemove', handleMouseMove);

	function handleMouseMove(event) {
		const { innerWidth, innerHeight } = window;
		const centerX = innerWidth / 2;
		const centerY = innerHeight / 2;
		const mouseX = event.clientX;
		const mouseY = event.clientY;

		// Calculate distance from the center of the window
		const distanceX = Math.abs(mouseX - centerX);
		const distanceY = Math.abs(mouseY - centerY);

		// Determine the maximum distance (which is half of the diagonal of the window)
		const maxDistance = Math.sqrt(Math.pow(centerX, 2) + Math.pow(centerY, 2));

		// Calculate rotation based on the distance
		// Closer to the center (0 degrees), farther (up to 15 degrees)
		rx = 25 * (distanceY / maxDistance);
		ry = 25 * (distanceX / maxDistance);

		// Adjust rotation direction based on mouse position relative to center
		rx *= mouseY < centerY ? 1 : -1;
		ry *= mouseX < centerX ? -1 : 1;
		return {
			destroy() {
				window.removeEventListener('mousemove', handleMouseMove);
			},
		};
	}
</script>

<div class="rotate">
	<div class="rotate__el" style={`--Rx: ${rx}deg; --Ry: ${ry}deg;`}></div>
</div>

<style lang="scss">
	.rotate {
		border: 2px solid red;
		width: 200px;
		height: 200px;
		perspective: 400px;
		transition: 0.2s;
	}

	.rotate__el {
		background-color: blue;
		width: 100%;
		height: 100%;
		transform: rotateX(var(--Rx)) rotateY(var(--Ry));
		transition: transform 0.3s ease-out;
	}
</style>
