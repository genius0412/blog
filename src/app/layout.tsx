import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({
	subsets: ["latin"],
	variable: "--font-inter",
	display: "swap",
});

const fraunces = Fraunces({
	subsets: ["latin"],
	variable: "--font-fraunces",
	display: "swap",
	axes: ["opsz"],
});

export const metadata: Metadata = {
	metadataBase: new URL("https://dohunkim.xyz"),
	title: {
		default: "Dohun Kim",
		template: "%s · Dohun Kim",
	},
	description:
		"Dohun Kim — high school junior in Weston, MA. Published math research, FTC robotics, competitive programming, software, music, and athletics.",
};

export default function RootLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<html lang="en" className={`${inter.variable} ${fraunces.variable}`}>
			<body className="font-sans bg-bg text-ink">
				<Header />
				{children}
				{modal}
			</body>
		</html>
	);
}
