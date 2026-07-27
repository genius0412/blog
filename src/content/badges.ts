// Resolves the chips shown on a portfolio card.
//
// Most items carry a static `badge` in data.ts. DSIM is the exception: its
// numbers are live, so they're fetched at render time rather than hardcoded
// into a statically built page where they'd be wrong within a day.
//
// Server-only (it fetches). Keeping the id-specific case here rather than in
// PortfolioItemView keeps content decisions in the content layer.
import type { PortfolioItem } from "./data";
import { dsimStatBadges, getDsimStats } from "@/lib/dsimStats";

/** Static chips declared on the item, normalized to an array. */
function staticBadges(item: PortfolioItem): string[] {
	if (!item.badge) return [];
	return Array.isArray(item.badge) ? item.badge : [item.badge];
}

export async function badgesFor(item: PortfolioItem): Promise<string[]> {
	const base = staticBadges(item);
	if (item.id !== "dsim") return base;

	// Live counts lead; if the game server is unreachable the card simply shows
	// whatever static chips remain, rather than a stale number.
	const stats = await getDsimStats();
	return stats ? [...dsimStatBadges(stats), ...base] : base;
}
