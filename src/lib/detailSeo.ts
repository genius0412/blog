// SEO for the MDX detail routes. Server-only (loadDetail uses fs) and shared by
// all three route groups so research/projects/robotics stay identical.
import type { Metadata } from "next";
import { loadDetail, type DetailGroup } from "@/content/mdx";
import { markdownToPlainText, pageMetadata, truncateForMeta } from "./seo";

/** Detail dates are human ranges ("2025–2026"); pull the first year out. */
export function detailYear(date?: string): string | undefined {
	return date?.match(/\d{4}/)?.[0];
}

export function detailMetadata(group: DetailGroup, slug: string): Metadata {
	const doc = loadDetail(group, slug);
	// Unknown slug renders a 404; make sure the head says so rather than
	// inheriting the site defaults.
	if (!doc) return { title: "Not found", robots: { index: false, follow: false } };

	const { meta, body } = doc;
	const description = meta.description?.trim()
		? truncateForMeta(meta.description)
		: truncateForMeta(markdownToPlainText(body));
	const year = detailYear(meta.date);

	return pageMetadata({
		title: meta.title,
		description,
		path: `/${group}/${slug}`,
		type: "article",
		...(year ? { publishedTime: new Date(`${year}-01-01`).toISOString() } : {}),
	});
}
