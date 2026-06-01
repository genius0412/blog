// Server-only registry + loader for detail-page MDX files (spec §5.5 / §6).
// An item is "deep" iff a matching MDX file exists; the tier falls out of the data.
// Server-only: these helpers use fs and must only be imported from server components.
import fs from "fs";
import path from "path";
import matter from "gray-matter";

// Detail routes live under these App-Router groups. The folder a file sits in
// determines its route group; the filename (sans .mdx) is its slug.
export const DETAIL_GROUPS = ["research", "projects", "robotics"] as const;
export type DetailGroup = (typeof DETAIL_GROUPS)[number];

const CONTENT_DIR = path.join(process.cwd(), "src/content");

export type DetailMeta = {
	id: string;
	title: string;
	kind?: "project" | "research" | "other";
	date?: string;
	description?: string;
	role?: string;
	people?: string[];
	links?: { label: string; href: string }[];
	log?: { date: string; entry: string }[];
};

export type DetailDoc = {
	group: DetailGroup;
	slug: string;
	meta: DetailMeta;
	body: string;
};

type RegistryEntry = { group: DetailGroup; slug: string };

// Build (and cache) the id → {group, slug} map by scanning the content folders.
let _registry: Map<string, RegistryEntry> | null = null;

function buildRegistry(): Map<string, RegistryEntry> {
	if (_registry) return _registry;
	const reg = new Map<string, RegistryEntry>();
	for (const group of DETAIL_GROUPS) {
		const dir = path.join(CONTENT_DIR, group);
		if (!fs.existsSync(dir)) continue;
		for (const file of fs.readdirSync(dir)) {
			if (!file.endsWith(".mdx")) continue;
			const slug = file.replace(/\.mdx$/, "");
			const raw = fs.readFileSync(path.join(dir, file), "utf8");
			const { data } = matter(raw);
			// Key by frontmatter id when present, else by filename. Both usually match.
			const id = typeof data.id === "string" && data.id ? data.id : slug;
			reg.set(id, { group, slug });
		}
	}
	_registry = reg;
	return reg;
}

/** True iff a detail MDX file exists for this portfolio item id. */
export function hasDetail(id: string): boolean {
	return buildRegistry().has(id);
}

/** Route href for an item's detail page, or undefined if it has none. */
export function detailHref(id: string): string | undefined {
	const entry = buildRegistry().get(id);
	return entry ? `/${entry.group}/${entry.slug}` : undefined;
}

/** Load and parse one detail doc, or null if the file does not exist. */
export function loadDetail(group: DetailGroup, slug: string): DetailDoc | null {
	const file = path.join(CONTENT_DIR, group, `${slug}.mdx`);
	if (!fs.existsSync(file)) return null;
	const raw = fs.readFileSync(file, "utf8");
	const { data, content } = matter(raw);
	return { group, slug, meta: data as DetailMeta, body: content };
}

/** [{ slug }] for a group's generateStaticParams. */
export function detailParamsForGroup(group: DetailGroup): { slug: string }[] {
	const dir = path.join(CONTENT_DIR, group);
	if (!fs.existsSync(dir)) return [];
	return fs
		.readdirSync(dir)
		.filter((f) => f.endsWith(".mdx"))
		.map((f) => ({ slug: f.replace(/\.mdx$/, "") }));
}
