import Link from "next/link";
import { FiArrowRight, FiStar } from "react-icons/fi";
import type { PortfolioItem } from "@/content/data";
import { hasDetail, detailHref } from "@/content/mdx";
import LinkList from "./ui/LinkList";
import Pill from "./ui/Pill";
import { categoryStyle } from "./ui/categoryStyle";

function formatDates(item: PortfolioItem): string | null {
	const { start, end } = item;
	if (!start && !end) return null;
	if (start && end) return start === end ? start : `${start}–${end}`;
	return start ?? end ?? null;
}

// Tier-aware renderer (spec §5.5). The tier falls out of the data:
//   deep  → MDX file exists  → card + "read more →"
//   rich  → has description/links → card, no read-more
//   line  → bare facts → single row, no card, no link-out
export default function PortfolioItemView({ item }: { item: PortfolioItem }) {
	const deep = hasDetail(item.id);
	const rich = !deep && Boolean(item.description || item.links?.length || item.tags?.length || item.badge);
	const dates = formatDates(item);
	const cs = categoryStyle[item.category];

	// ── Line item ────────────────────────────────────────────────────────
	// A bare row, but a `featured` one is still a standout result — give it a
	// star and heavier title so it rises above the ordinary lines around it.
	if (!deep && !rich) {
		return (
			<div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-border/60 py-2.5">
				<span className={`inline-flex items-center gap-2 ${item.featured ? "font-semibold text-ink" : "text-ink"}`}>
					{item.featured ? (
						<FiStar className="h-3.5 w-3.5 shrink-0 fill-accent text-accent" aria-hidden />
					) : (
						<span className={`h-1.5 w-1.5 shrink-0 rounded-full ${cs.dot}`} aria-hidden />
					)}
					{item.title}
				</span>
				<span className="text-sm text-muted">
					{item.role ? <span>{item.role}</span> : null}
					{item.role && dates ? <span> · </span> : null}
					{dates ? <span>{dates}</span> : null}
				</span>
			</div>
		);
	}

	// ── Rich / Deep card ─────────────────────────────────────────────────
	const href = deep ? detailHref(item.id) : undefined;

	const body = (
		<>
			<div className="flex flex-wrap items-baseline justify-between gap-x-3">
				<h3 className="font-serif text-xl font-semibold text-ink">{item.title}</h3>
				{dates ? <span className="text-sm text-muted">{dates}</span> : null}
			</div>
			{item.role ? <p className="mt-0.5 text-sm text-muted">{item.role}</p> : null}
			{item.badge ? (
				<div className="mt-2 flex flex-wrap gap-2">
					{(Array.isArray(item.badge) ? item.badge : [item.badge]).map((b) => (
						<Pill key={b} accent>
							{b}
						</Pill>
					))}
				</div>
			) : null}
			{item.description ? (
				<p className="mt-2 leading-relaxed text-ink">{item.description}</p>
			) : null}
			{item.tags?.length ? (
				<div className="mt-3 flex flex-wrap gap-2">
					{item.tags.map((t) => (
						<Pill key={t}>{t}</Pill>
					))}
				</div>
			) : null}
			{item.links?.length ? (
				<div className="mt-3">
					<LinkList links={item.links} />
				</div>
			) : null}
			{deep && href ? (
				<Link
					href={href}
					className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent hover:gap-1.5"
				>
					read more
					<FiArrowRight className="h-4 w-4 transition-all" />
				</Link>
			) : null}
		</>
	);

	return (
		<div
			className={`rounded-2xl border border-l-4 border-border ${cs.barL} bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift`}
		>
			{body}
		</div>
	);
}
