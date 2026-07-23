import type { Metadata } from "next";
import { categoryMeta, itemsByCategory, profile } from "@/content/data";
import FadeIn from "@/components/motion/FadeIn";
import PortfolioItemView from "@/components/PortfolioItemView";
import PortfolioJumpNav from "@/components/PortfolioJumpNav";
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
			<main id="main-content" tabIndex={-1} className="mx-auto max-w-5xl px-5 sm:px-8">
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

				<PortfolioJumpNav />

				{categoryMeta.map((c) => {
					const sectionItems = itemsByCategory(c.id);
					if (sectionItems.length === 0) return null;
					const cs = categoryStyle[c.id];
					const Icon = cs.Icon;
					return (
						<section
							key={c.id}
							id={c.id}
							tabIndex={-1}
							aria-labelledby={`${c.id}-heading`}
							className="scroll-mt-32 border-t border-border py-12 first:border-t-0"
						>
							<FadeIn>
								<div className="flex items-center gap-3">
									<span
										aria-hidden
										className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border ${cs.border} ${cs.bg} ${cs.text}`}
									>
										<Icon className="h-5 w-5" />
									</span>
									<div>
										<h2 id={`${c.id}-heading`} className="font-serif text-2xl font-semibold text-ink">
											{c.label}
										</h2>
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
