module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		fontFamily: {
			Lexend: ["Lexend Deca", "sans-serif"],
		},
		extend: {},
	},
	plugins: [
		require("@tailwindcss/forms"),
	],
};
