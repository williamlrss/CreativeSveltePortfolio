import src1 from '../assets/images/William-Lerossignol-PORTFOLIO (1).png';
import src2 from '../assets/images/William-Lerossignol-PORTFOLIO (2).png';
import src3 from '../assets/images/William-Lerossignol-PORTFOLIO (3).png';
import src4 from '../assets/images/William-Lerossignol-PORTFOLIO (4).png';
import src5 from '../assets/images/William-Lerossignol-PORTFOLIO (5).png';
import src6 from '../assets/images/William-Lerossignol-PORTFOLIO (6).png';
import src7 from '../assets/images/William-Lerossignol-PORTFOLIO (7).png';
import src8 from '../assets/images/William-Lerossignol-PORTFOLIO (8).png';
import src9 from '../assets/images/William-Lerossignol-PORTFOLIO (9).png';

import introduction from '../components/panels/Introduction.svelte?raw';
import textOnScroll from '../components/panels/TextOnScroll.svelte?raw';
import scrollX from '../components/panels/ScrollX.svelte?raw';
import scrollXProps from '../components/panels/ScrollXProps.svelte?raw';
import menu from '../components/Menu.svelte?raw';
import theCode from '../components/navItems/TheCode.svelte?raw';
import customHighlight from '../components/CustomHighlight.svelte?raw';
import scrollBackToButton from '../actions/scrollBackToButton.js?raw';
import myCodeRaw from '../scripts/RawMyCode.txt?raw';
import isMobileStore from '../stores/isMobileStore.js?raw';
import scrollStore from '../stores/scrollStore.js?raw';
import fontSizer from '../actions/fontSizer.js?raw';
import cubicBackground from '../components/CubicBackground.svelte?raw';
import noise from '../actions/noise.js?raw';
import debounce from './debounce.js?raw';
import throttle from './throttle.js?raw';
import rotateOnMouseMove from '../actions/rotateOnMouseAction.js?raw';

const processCodeFile = (rawContent, filePath) => {
	rawContent = rawContent.replace(/\t/g, '  ');
	const fileName = filePath.split('/').pop().split('?')[0];
	const jsRegex = /\.js$/;
	const svelteRegex = /\.svelte$/;
	const txtRegex = /\.txt$/;

	if (jsRegex.test(fileName) || txtRegex.test(fileName)) return [{ code: rawContent, language: 'javascript' }];
	else if (svelteRegex.test(fileName)) {
		const scriptRegex = /(<script[^>]*>[\s\S]*?<\/script>)/;
		const styleRegex = /(<style[^>]*>[\s\S]*?<\/style>)/;
		const scriptMatch = rawContent.match(scriptRegex);
		const styleMatch = rawContent.match(styleRegex);

		const scriptContent = scriptMatch ? scriptMatch[1].trim() : '';
		const styleContent = styleMatch ? styleMatch[1].trim() : '';

		const htmlContent = rawContent.replace(scriptContent, '').replace(styleContent, '').trim();

		return [
			{ code: scriptContent, language: 'javascript' },
			{ code: htmlContent, language: 'xml' },
			{ code: styleContent, language: 'scss' },
		];
	}
};

export const codeData = [
	{
		codeHighlighted: processCodeFile(introduction, '../components/panels/Introduction.svelte'),
		img: src1,
		title: 'SVELTE | Introduction',
		subtitle: 'Component of the very first panel',
	},
	{
		codeHighlighted: processCodeFile(textOnScroll, '../components/panels/TextOnScroll.svelte'),
		img: src3,
		title: 'SVELTE | TextOnScroll',
		subtitle: 'Text fixed, animated on scroll',
	},
	{
		codeHighlighted: processCodeFile(scrollX, '../components/panels/ScrollX.svelte'),
		img: src4,
		title: 'SVELTE | ScrollX | Main — Part 1',
		subtitle: 'Translate scrollXProps horizontally on scroll',
	},
	{
		codeHighlighted: processCodeFile(scrollXProps, '../components/panels/ScrollXProps.svelte'),
		img: src9,
		title: 'SVELTE | ScrollX | Props — Part 2',
		subtitle: 'See how did I manage this reusable content',
	},
	{
		codeHighlighted: processCodeFile(menu, '../components/Menu.svelte'),
		img: src2,
		title: 'SVELTE | Menu — Part 1',
		subtitle: 'Whole content and navigation process of this very menu',
	},
	{
		codeHighlighted: processCodeFile(theCode, '../components/navItems/TheCode.svelte'),
		img: src7,
		title: 'SVELTE | Menu | The code — Part 1',
		subtitle: 'Navigation content and process',
	},
	{
		codeHighlighted: processCodeFile(customHighlight, '../components/CustomHighlight.svelte'),
		img: src5,
		title: 'SVELTE | Menu | The code — Part 2',
		subtitle: 'Displayed with highlight.js extension',
	},
	{
		codeHighlighted: processCodeFile(scrollBackToButton, '../actions/scrollBackToButton.js'),
		img: src8,
		title: 'JS | Menu | The code — Part 3',
		subtitle: 'Scrolling back to button',
	},
	{
		codeHighlighted: processCodeFile(myCodeRaw, '../scripts/RawMyCode.txt?raw'),
		img: '',
		title: 'JS | Menu | The code — Part 4',
		subtitle: 'Defining codes using raw files',
	},
	{
		codeHighlighted: processCodeFile(isMobileStore, '../stores/isMobileStore.js'),
		img: '',
		title: 'JS | isMobileStore',
		subtitle: 'Identifies touch-enabled and portrait devices',
	},
	{
		codeHighlighted: processCodeFile(scrollStore, '../stores/scrollStore.js'),
		img: '',
		title: 'JS | scrollStore',
		subtitle: 'Global variable that share the scroll value with a small linear interpolation',
	},
	{
		codeHighlighted: processCodeFile(fontSizer, '../actions/fontSizer.js'),
		img: '',
		title: 'JS | fontSizer',
		subtitle: 'Size and resize font based on container width or height',
	},
	{
		codeHighlighted: processCodeFile(cubicBackground, '../components/CubicBackground.svelte'),
		img: src6,
		title: 'SVELTE | cubic background',
		subtitle: 'Animating an array of items while the user is AFK',
	},
	{
		codeHighlighted: processCodeFile(noise, '../actions/noise.js'),
		img: '',
		title: 'JS | noise / texture',
		subtitle: 'Generates a noise pattern for background texture',
	},
	{
		codeHighlighted: processCodeFile(debounce, './debounce.js'),
		img: '',
		title: 'JS | debounce',
		subtitle: 'Cancel callbacks during the selected timeframe and awaits the same delay to trigger it',
	},
	{
		codeHighlighted: processCodeFile(throttle, './throttle.js'),
		img: '',
		title: 'JS | throttle',
		subtitle: 'Limits function execution to once within the specified timeframe',
	},
	{
		codeHighlighted: processCodeFile(rotateOnMouseMove, '../actions/rotateOnMouseAction.js'),
		img: '',
		title: 'JS | rotateOnMouseMove [useful - not used]',
		subtitle: 'Used on containers to slightly rotate its content towards the mouse',
	},
];
