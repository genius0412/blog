import type { Metadata } from "next";
import { categoryMeta, itemsByCategory, profile } from "@/content/data";
import FadeIn from "@/components/motion/FadeIn";
import PortfolioItemView from "@/components/PortfolioItemView";
import Pill from "@/components/ui/Pill";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Portfolio",
	description: "A full overview of Dohun Kim's work across research, robotics, math, code, music, and athletics.",
};

export default function PortfolioPage() {
	return (
		<>
			<main className="mx-auto max-w-5xl px-5 sm:px-8">
				<section className="pb-8 pt-12 sm:pt-16">
					<h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Portfolio</h1>
					<p className="mt-3 max-w-2xl text-lg text-muted">
						The full picture — newest first within each area. Items with more behind them
						open into a detail page.
					</p>
					<div className="mt-6 flex flex-wrap gap-2">
						{profile.skills.flatMap((g) => g.items).map((s) => (
							<Pill key={s}>{s}</Pill>
						))}
					</div>
				</section>

				{/* Sticky jump-nav */}
				<nav className="sticky top-16 z-30 -mx-5 border-y border-border bg-bg/90 px-5 py-3 backdrop-blur-sm sm:-mx-8 sm:px-8">
					<ul className="flex gap-x-5 gap-y-1 overflow-x-auto whitespace-nowrap text-sm">
						{categoryMeta.map((c) => (
							<li key={c.id}>
								<a href={`#${c.id}`} className="text-muted transition-colors hover:text-accent">
									{c.label}
								</a>
							</li>
						))}
					</ul>
				</nav>

				{categoryMeta.map((c) => {
					const sectionItems = itemsByCategory(c.id);
					if (sectionItems.length === 0) return null;
					return (
						<section key={c.id} id={c.id} className="scroll-mt-32 border-t border-border py-12 first:border-t-0">
							<FadeIn>
								<h2 className="font-serif text-2xl font-semibold text-ink">{c.label}</h2>
								<p className="mt-1 text-muted">{c.tagline}</p>
							</FadeIn>
							<div className="mt-6 space-y-4">
								{sectionItems.map((item) => (
									<PortfolioItemView key={item.id} item={item} />
								))}
							</div>
						</section>
					);
				})}
			</main>
			<Footer />
		</>
	);
}
