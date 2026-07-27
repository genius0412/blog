// Shared SEO constants + helpers. Everything that needs an absolute URL, a
// canonical, or a JSON-LD block goes through here so the site speaks with one
// voice to crawlers and social scrapers.
import type { Metadata } from "next";
import { profile } from "@/content/data";

export const SITE_URL = "https://dohunkim.xyz";
export const SITE_NAME = "Dohun Kim";
export const SITE_LOCALE = "en_US";

// Served by src/app/opengraph-image.tsx. Keep the alt text in sync with the
// `alt` export there.
export const OG_IMAGE_PATH = "/opengraph-image";
export const OG_IMAGE_ALT = "Dohun Kim — math research, robotics, and software";

export const githubUrl = `https://github.com/${profile.github}`;
export const linkedinUrl = `https://linkedin.com/in/${profile.linkedin}`;

/** Absolute URL for a site-relative path. */
export function absoluteUrl(path: string): string {
	return new URL(path, SITE_URL).toString();
}

/**
 * Canonical + Open Graph + Twitter for a page, in one call.
 * `path` is site-relative ("/blog"); everything else falls back to the
 * layout-level defaults, which Next merges for us.
 */
export function pageMetadata({
	title,
	description,
	path,
	type = "website",
	publishedTime,
	modifiedTime,
}: {
	title?: string;
	description?: string;
	path: string;
	type?: "website" | "article" | "profile";
	publishedTime?: string;
	modifiedTime?: string;
}): Metadata {
	const url = absoluteUrl(path);
	// The app/opengraph-image file convention only auto-attaches to a route that
	// doesn't declare its own `openGraph` — and every page here does. So point at
	// it explicitly, or subpages ship social cards with no image.
	const images = [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: OG_IMAGE_ALT }];
	return {
		...(title ? { title } : {}),
		...(description ? { description } : {}),
		alternates: { canonical: url },
		openGraph: {
			type: type === "profile" ? "profile" : type,
			url,
			siteName: SITE_NAME,
			locale: SITE_LOCALE,
			images,
			...(title ? { title } : {}),
			...(description ? { description } : {}),
			...(type === "article"
				? {
						authors: [SITE_NAME],
						...(publishedTime ? { publishedTime } : {}),
						...(modifiedTime ? { modifiedTime } : {}),
					}
				: {}),
		},
		twitter: {
			card: "summary_large_image",
			images,
			...(title ? { title } : {}),
			...(description ? { description } : {}),
		},
	};
}

/**
 * Trim prose down to something usable as a meta description. Search engines
 * show ~155–160 chars, so cut on a word boundary just under that.
 */
export function truncateForMeta(text: string, max = 155): string {
	const clean = text.replace(/\s+/g, " ").trim();
	if (clean.length <= max) return clean;
	const cut = clean.slice(0, max);
	const lastSpace = cut.lastIndexOf(" ");
	return `${(lastSpace > 60 ? cut.slice(0, lastSpace) : cut).replace(/[,.;:—-]+$/, "")}…`;
}

/** Strip Markdown down to plain prose so it can seed a description. */
export function markdownToPlainText(markdown: string): string {
	return markdown
		.replace(/```[\s\S]*?```/g, " ") // fenced code
		.replace(/`[^`]*`/g, " ") // inline code
		.replace(/!\[[^\]]*\]\([^)]*\)/g, " ") // images
		.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1") // links → their text
		.replace(/^\s{0,3}>\s?/gm, "") // blockquote markers
		.replace(/^\s{0,3}#{1,6}\s+/gm, "") // headings
		.replace(/[*_~]+/g, "") // emphasis
		.replace(/^\s*[-*+]\s+/gm, "") // list bullets
		.replace(/\s+/g, " ")
		.trim();
}

/** The site-wide Person node, reused by the home page and article bylines. */
export const personJsonLd = {
	"@type": "Person",
	"@id": `${SITE_URL}/#person`,
	name: profile.name,
	url: SITE_URL,
	image: absoluteUrl("/images/profile.jpg"),
	description: profile.positioning,
	jobTitle: "Student",
	email: `mailto:${profile.email}`,
	address: {
		"@type": "PostalAddress",
		addressLocality: "Weston",
		addressRegion: "MA",
		addressCountry: "US",
	},
	alumniOf: {
		"@type": "EducationalOrganization",
		name: "Weston High School",
	},
	knowsAbout: [
		"Mathematics research",
		"Combinatorics",
		"FIRST Tech Challenge robotics",
		"Competitive programming",
		"Software engineering",
	],
	sameAs: [githubUrl, linkedinUrl],
};
