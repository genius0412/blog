import type { MetadataRoute } from "next";
import getPostMetadata from "@/components/getPostMetadata";
import { DETAIL_GROUPS, detailParamsForGroup, loadDetail } from "@/content/mdx";
import { absoluteUrl } from "@/lib/seo";

// Generated at build time from the same sources the pages render from
// (src/posts/*.md and src/content/<group>/*.mdx), so dropping in a new post or
// detail file adds it to the sitemap with no extra step.
export default function sitemap(): MetadataRoute.Sitemap {
	const now = new Date();

	const staticRoutes: MetadataRoute.Sitemap = [
		{ url: absoluteUrl("/"), lastModified: now, changeFrequency: "monthly", priority: 1 },
		{ url: absoluteUrl("/portfolio"), lastModified: now, changeFrequency: "monthly", priority: 0.9 },
		{ url: absoluteUrl("/blog"), lastModified: now, changeFrequency: "weekly", priority: 0.7 },
		{ url: absoluteUrl("/resume"), lastModified: now, changeFrequency: "monthly", priority: 0.6 },
	];

	const posts: MetadataRoute.Sitemap = getPostMetadata().map((post) => ({
		url: absoluteUrl(`/blog/${post.slug}`),
		lastModified: new Date(post.date),
		changeFrequency: "yearly",
		priority: 0.6,
	}));

	const details: MetadataRoute.Sitemap = DETAIL_GROUPS.flatMap((group) =>
		detailParamsForGroup(group).map(({ slug }) => {
			// Detail dates are human ranges ("2025–2026"), not parseable timestamps —
			// take the leading year when there is one, else fall back to the build time.
			const year = loadDetail(group, slug)?.meta.date?.match(/\d{4}/)?.[0];
			return {
				url: absoluteUrl(`/${group}/${slug}`),
				lastModified: year ? new Date(`${year}-01-01`) : now,
				changeFrequency: "yearly" as const,
				priority: 0.8,
			};
		}),
	);

	return [...staticRoutes, ...posts, ...details];
}
