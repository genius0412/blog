import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "@/lib/seo";

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

const description =
	"Dohun Kim — high school junior in Weston, MA. Published math research, FTC robotics, competitive programming, software, music, and athletics.";

export const metadata: Metadata = {
	metadataBase: new URL(SITE_URL),
	title: {
		default: "Dohun Kim — Math Research, Robotics & Software",
		template: "%s · Dohun Kim",
	},
	description,
	applicationName: SITE_NAME,
	authors: [{ name: SITE_NAME, url: SITE_URL }],
	creator: SITE_NAME,
	publisher: SITE_NAME,
	keywords: [
		"Dohun Kim",
		"MIT PRIMES STEP",
		"math research",
		"combinatorics",
		"FTC robotics",
		"FIRST Tech Challenge",
		"competitive programming",
		"USACO",
		"Weston High School",
	],
	// No `alternates` here on purpose: metadata is inherited, so a layout-level
	// canonical would silently point every page at "/". Each page sets its own.
	openGraph: {
		type: "website",
		url: SITE_URL,
		siteName: SITE_NAME,
		locale: SITE_LOCALE,
		title: "Dohun Kim — Math Research, Robotics & Software",
		description,
	},
	twitter: {
		card: "summary_large_image",
		title: "Dohun Kim — Math Research, Robotics & Software",
		description,
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-image-preview": "large",
			"max-snippet": -1,
			"max-video-preview": -1,
		},
	},
	formatDetection: { telephone: false },
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
				<a href="#main-content" className="skip-link">
					Skip to content
				</a>
				<Header />
				{children}
				{modal}
			</body>
		</html>
	);
}
