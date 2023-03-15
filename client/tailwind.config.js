const colors = require('tailwindcss/colors')

module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				...colors,

				brand: {
					300: '#8F8FF7',
					400: '#6A6AB8',
					500: '#6363ac',
					600: '#545491',
					700: '#3E3E6B'
				}
			},
			screens: {
				xs: '340px',
				sm: '540px',
				md: '720px',
				lg: '920px',
				xl: '1040px'
			},
			animation: {
				loading: 'rotate 1s linear infinite'
			},
			display: ["group-hover"],
		},
		fontFamily: {
			sans: ['Source Sans Pro', 'sans-serif']
		}
	},
	plugins: []
}
