import type { Metadata } from "next";
import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Page not found",
	robots: { index: false, follow: true },
};

export default function NotFound() {
	return (
		<>
			<main
				id="main-content"
				tabIndex={-1}
				className="mx-auto max-w-3xl px-5 pb-24 pt-24 sm:px-8"
			>
				<p className="font-mono text-sm text-muted">404</p>
				<h1 className="mt-2 font-serif text-4xl font-semibold text-ink sm:text-5xl">
					This page doesn&apos;t exist
				</h1>
				<p className="mt-3 text-lg text-muted">
					The link may be out of date. Try the{" "}
					<Link href="/portfolio">portfolio</Link>, the <Link href="/blog">blog</Link>, or
					head back <Link href="/">home</Link>.
				</p>
			</main>
			<Footer />
		</>
	);
}
