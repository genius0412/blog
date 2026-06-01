import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { PortfolioItem } from "@/content/data";
import { hasDetail, detailHref } from "@/content/mdx";
import LinkList from "./ui/LinkList";

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
	const rich = !deep && Boolean(item.description || (item.links && item.links.length));
	const dates = formatDates(item);

	// ── Line item ────────────────────────────────────────────────────────
	if (!deep && !rich) {
		return (
			<div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5 border-b border-border/60 py-2.5">
				<span className="text-ink">{item.title}</span>
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
			{item.description ? (
				<p className="mt-2 leading-relaxed text-ink">{item.description}</p>
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
		<div className="rounded-2xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift">
			{body}
		</div>
	);
}
