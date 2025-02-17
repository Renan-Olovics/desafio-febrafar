/** @type {import('tailwindcss').Config}*/
const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
				primary: '#C54E7C',
				secondary: '#7A8CA0',
				tertiary: '#2D3E50',
				white1: '#F1F5F9',
				white2: '#E0E0E0',
				white3: '#FCEBF3',
				white4: '#E0E7FF'
			}
		}
	},

	plugins: []
};

module.exports = config;
