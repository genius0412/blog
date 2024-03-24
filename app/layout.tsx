import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Dohun's Blog",
	description: "Dohun Kim's Blog",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Header/>
				{children}
			</body>
		</html>
	);
}
