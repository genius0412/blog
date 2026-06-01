import type { Metadata } from "next";
import { FiCornerDownRight } from "react-icons/fi";
import { categoryMeta, itemsByCategory, profile } from "@/content/data";
import FadeIn from "@/components/motion/FadeIn";
import PortfolioItemView from "@/components/PortfolioItemView";
import Pill from "@/components/ui/Pill";
import { categoryStyle } from "@/components/ui/categoryStyle";
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
						A fuller picture of what I&apos;ve been up to — across research, robotics, math,
						code, music, and athletics. Anything with a deeper story behind it opens into its
						own page.
					</p>
					<div className="mt-6 flex flex-wrap gap-2">
						{profile.skills.flatMap((g) => g.items).map((s) => (
							<Pill key={s}>{s}</Pill>
						))}
					</div>
				</section>

				{/* Sticky jump-nav */}
				<nav
					aria-label="Jump to section"
					className="sticky top-16 z-30 -mx-5 border-y border-border bg-bg/90 px-5 py-2.5 backdrop-blur-sm sm:-mx-8 sm:px-8"
				>
					<div className="flex items-center gap-3 text-sm">
						<span className="flex shrink-0 items-center gap-1.5 font-medium text-ink">
							<FiCornerDownRight className="h-4 w-4 text-muted" aria-hidden />
							Jump to
						</span>
						<span aria-hidden className="h-5 w-px shrink-0 bg-border" />
						<ul className="flex gap-x-1 overflow-x-auto whitespace-nowrap">
							{categoryMeta.map((c) => (
								<li key={c.id}>
									<a
										href={`#${c.id}`}
										className="inline-flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted transition-colors hover:bg-surface hover:text-ink"
									>
										<span className={`h-2 w-2 rounded-full ${categoryStyle[c.id].dot}`} aria-hidden />
										{c.label}
									</a>
								</li>
							))}
						</ul>
					</div>
				</nav>

				{categoryMeta.map((c) => {
					const sectionItems = itemsByCategory(c.id);
					if (sectionItems.length === 0) return null;
					const cs = categoryStyle[c.id];
					const Icon = cs.Icon;
					return (
						<section key={c.id} id={c.id} className="scroll-mt-32 border-t border-border py-12 first:border-t-0">
							<FadeIn>
								<div className="flex items-center gap-3">
									<span
										className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${cs.border} ${cs.bg} ${cs.text}`}
									>
										<Icon className="h-5 w-5" />
									</span>
									<div>
										<h2 className="font-serif text-2xl font-semibold text-ink">{c.label}</h2>
										<p className="text-muted">{c.tagline}</p>
									</div>
								</div>
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
