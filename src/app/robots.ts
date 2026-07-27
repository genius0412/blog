import type { MetadataRoute } from "next";
import { absoluteUrl, SITE_URL } from "@/lib/seo";

// Replaces the old static robots.txt so the sitemap reference stays in sync
// with SITE_URL. /api/* is disallowed — those routes are view/like counters
// with nothing to index.
export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: "*",
			allow: "/",
			disallow: "/api/",
		},
		sitemap: absoluteUrl("/sitemap.xml"),
		host: SITE_URL,
	};
}
