const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const imported = require('postcss-import');
const nested = require('tailwindcss/nesting');

const config = {
	plugins: [
		//Some plugins, like tailwindcss/nesting, need to run before Tailwind,
		tailwindcss(),
		//But others, like autoprefixer, need to run after,
		autoprefixer,
		imported,
		nested
	]
};

module.exports = config;
