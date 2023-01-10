const colors = require("tailwindcss/colors");

module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		colors: {
			primary: "#666666",
			secondary: "#358E94",
			lightGray: "#2C2C2C",
			indigo: colors.indigo,
			blue: colors.blue,
			gray: colors.gray,
			white: colors.white,
			red: colors.red,
			cyan: colors.cyan,
			lime: colors.lime,
			black: colors.black
		},
		fontFamily: {
			Lexend: ["Lexend Deca", "sans-serif"],
		},
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
};
