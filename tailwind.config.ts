import type { Config } from "tailwindcss";

const config: Config = {
	content: [
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/content/**/*.{md,mdx}",
	],
	theme: {
		extend: {
			colors: {
				bg: "#faf8f5",
				surface: "#ffffff",
				border: "#ece7e0",
				ink: "#1f2421",
				muted: "#6b665f",
				accent: {
					DEFAULT: "#c2683f",
					soft: "#f4e6dd",
				},
			},
			fontFamily: {
				serif: ["var(--font-fraunces)", "Georgia", "serif"],
				sans: ["var(--font-inter)", "system-ui", "sans-serif"],
			},
			boxShadow: {
				soft: "0 1px 2px rgba(31, 36, 33, 0.04), 0 8px 24px rgba(31, 36, 33, 0.05)",
				lift: "0 4px 12px rgba(31, 36, 33, 0.08), 0 12px 32px rgba(31, 36, 33, 0.08)",
			},
			backgroundImage: {
				"gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
			},
		},
	},
	plugins: [
		require("@tailwindcss/typography"),
		require("tailwind-scrollbar"),
	],
};
export default config;
