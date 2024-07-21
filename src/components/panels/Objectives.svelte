<div style="width: 100vw; height: 100vh;"></div>
<div class="intro">
	<p class="intro-list-item" style="margin-bottom: 1.5em;">
		...Specialised in JavaScript and modular development such as React.jsx and Svelte.js with knowledge of:
	</p>
	<ul class="intro-list">
		<li class="intro-list-item">deployment</li>
		<li class="intro-list-item">back-end with node.js</li>
		<li class="intro-list-item">Unit to end-to-end testing</li>
		<li class="intro-list-item">Error log organization</li>
		<li class="intro-list-item">DNS</li>
		<li class="intro-list-item">Linux API server securitisation and management</li>
	</ul>
</div>

<style lang="scss">
	.intro {
		position: absolute;
		top: 0;
		left: 0;
		z-index: 1;
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 5vh;

		&-list {
			display: flex;
			flex-direction: column;
			gap: 1em;
			padding-left: 4vw;

			&-item {
				position: relative;
				z-index: 2;
				color: #f7e7ce;
				font-size: 6vw;
				list-style: lower-roman;

				@media (min-aspect-ratio: 1/1) {
					font-size: 2.5vw;
				}
			}
		}
	}
</style>
