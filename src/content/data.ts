// Single source of truth for site content (spec §6).
// Pages render from this module; nothing is hardcoded in JSX.
// Long-form prose for "deep" items lives in MDX files under src/content/<group>/<id>.mdx
// and is linked by `id` — an item is "deep" iff such a file exists (see ./mdx.ts).

export type Link = { label: string; href: string };

export type Category =
	| "research"
	| "robotics"
	| "math"
	| "cp"
	| "software"
	| "music"
	| "athletics"
	| "education";

export type PortfolioItem = {
	id: string;
	title: string;
	org?: string;
	role?: string;
	start?: string; // "2024"
	end?: string; // "present"
	description?: string; // 1–2 sentence card summary
	links?: Link[];
	tags?: string[];
	category: Category;
	featured?: boolean; // surfaced on the home page
	// No detailSlug flag: an item is "deep" iff an MDX file with this id exists.
};

export type Profile = {
	name: string;
	tagline: string;
	positioning: string;
	location: string;
	email: string;
	github: string; // username
	intro: string;
	skills: { group: string; items: string[] }[];
	stats: { label: string; value: string }[];
};

export const profile: Profile = {
	name: "Dohun Kim",
	tagline: "Researcher, builder, and competitor — across math, robotics, and code.",
	positioning: "High school junior in Weston, MA.",
	location: "Weston, MA",
	email: "dohunkimofficial@gmail.com",
	github: "genius0412",
	intro:
		"I'm a junior at Weston High School (4.0) doing published math research through MIT PRIMES STEP, co-captaining FTC robotics, and competing in math and informatics. I also sing a cappella and play tennis — the breadth matters to me as much as the spike.",
	skills: [
		{ group: "Programming", items: ["C/C++", "JavaScript/TypeScript", "Python", "Java"] },
		{ group: "Languages", items: ["English (Fluent)", "Korean (Fluent)", "Spanish (Intermediate)"] },
		{ group: "Frameworks & Tools", items: ["React", "Next.js", "Onshape (CAD)"] },
	],
	stats: [
		{ value: "2", label: "Published papers (arXiv)" },
		{ value: "Gold", label: "USACO 2026" },
		{ value: "1737", label: "Codeforces rating" },
		{ value: "141/150", label: "AMC 10A 2024" },
		{ value: "2nd", label: "FTC Worlds — Motivate Award" },
	],
};

// Home "featured highlights" — curated, given visual weight (spec §5.1.5).
export const featuredHighlightIds = ["gozinta-boxes", "chip-firing", "ftc-worlds"];

// Section order + labels for the home previews and portfolio (spec §5.2).
export const categoryMeta: { id: Category; label: string; tagline: string }[] = [
	{ id: "research", label: "Research & Academic", tagline: "Published math research through MIT PRIMES STEP." },
	{ id: "robotics", label: "Robotics", tagline: "FTC co-captain, CAD lead, and program mentor." },
	{ id: "math", label: "Mathematics", tagline: "AMC/AIME, olympiads, and team competitions." },
	{ id: "cp", label: "Competitive Programming", tagline: "USACO Gold, Codeforces, and informatics olympiads." },
	{ id: "software", label: "Software", tagline: "Web tools, open-source contributions, and apps." },
	{ id: "music", label: "Music", tagline: "A cappella soloist and choir singer." },
	{ id: "athletics", label: "Athletics", tagline: "High school tennis." },
	{ id: "education", label: "Education", tagline: "Coursework and academic background." },
];

export const items: PortfolioItem[] = [
	// ── Research & Academic ──────────────────────────────────────────────
	{
		id: "primes-step",
		title: "MIT PRIMES STEP — Senior Group",
		org: "MIT PRIMES",
		role: "Math researcher",
		start: "2024",
		end: "2025",
		category: "research",
		featured: true,
		description:
			"Year-long mentored math research in the Senior Group, producing two papers posted to arXiv.",
	},
	{
		id: "gozinta-boxes",
		title: "Mathematics of Gozinta Boxes",
		role: "Co-author",
		start: "2025",
		end: "2025",
		category: "research",
		featured: true,
		description: "Published combinatorics research, posted to arXiv.",
		links: [{ label: "arXiv", href: "https://arxiv.org/abs/2508.18277" }],
	},
	{
		id: "chip-firing",
		title: "Chip-Firing in Infinite k-ary Trees",
		role: "Co-author",
		start: "2025",
		end: "2025",
		category: "research",
		featured: true,
		description: "Published research on chip-firing dynamics, posted to arXiv.",
		links: [{ label: "arXiv", href: "https://arxiv.org/abs/2501.06675" }],
	},

	// ── Robotics ─────────────────────────────────────────────────────────
	{
		id: "ftc-leadership",
		title: "FTC #22489 — Galactic Narwhal Chicken Effect (Diamond, Weston)",
		role: "Co-Captain (2025–2026); team member (2024–2025)",
		start: "2024",
		end: "2026",
		category: "robotics",
		description:
			"Co-captain of a competitive FIRST Tech Challenge team — leading design, strategy, and the team's run to the World Championship.",
	},
	{
		id: "ftc-worlds",
		title: "FTC World Championship — Motivate Award, 2nd",
		org: "FIRST (Jemison Division)",
		start: "2025",
		end: "2025",
		category: "robotics",
		featured: true,
		description:
			"Earned 2nd place for the Motivate Award at the FIRST Tech Challenge World Championship.",
	},
	{
		id: "ftc-states",
		title: "FTC Massachusetts State Championship — Winning Alliance Captain",
		start: "2025",
		end: "2025",
		category: "robotics",
		role: "Winning Alliance Captain",
	},
	{
		id: "mti",
		title: "Multinational Tech Invitational — playoffs (top 16)",
		start: "2025",
		end: "2025",
		category: "robotics",
		role: "Invited; reached playoffs",
	},
	{
		id: "michiana",
		title: "Advanced to the Michiana Premier Event",
		start: "2025",
		end: "2025",
		category: "robotics",
	},
	{
		id: "weston-robotics-council",
		title: "Weston Robotics — Planning Council & Program-Wide Mentor",
		start: "2026",
		end: "present",
		category: "robotics",
		role: "Planning Council & Program-Wide Mentor",
	},
	{
		id: "fll-mentor",
		title: "Volunteer FLL Mentor — \"Butterfly Effect\" & \"LegoImpossible\"",
		start: "2024",
		end: "2026",
		category: "robotics",
		role: "Volunteer mentor",
	},
	{
		id: "into-the-deep",
		title: "Into the Deep — Full Robot CAD",
		role: "CAD / mechanical design",
		start: "2024",
		end: "2025",
		category: "robotics",
		description: "Full-robot CAD for the 2024–2025 Into the Deep season, modeled in Onshape.",
		links: [
			{
				label: "Onshape CAD",
				href: "https://cad.onshape.com/documents/2e5ebebe43c247d2291879a2/w/2564d9489293bfa6bdffefc9/e/33d929603717268545ab0c75",
			},
		],
	},
	{
		id: "decode-pto",
		title: "DECODE — Clutch PTO Lift & Drivetrain",
		role: "Drivetrain + clutch power-take-off (PTO) lift",
		start: "2025",
		end: "2026",
		category: "robotics",
		description:
			"Designed the drivetrain and a clutch power-take-off (PTO) lift system for the 2025–2026 DECODE season.",
		links: [
			{
				label: "Onshape CAD",
				href: "https://cad.onshape.com/documents/8dbb6ec5b64ba5d9556668ce/w/7242710ea56febb23e213c1a/e/cf81280e74517a36b814bdf1",
			},
		],
	},

	// ── Mathematics ──────────────────────────────────────────────────────
	{
		id: "amc10a-2024",
		title: "AMC 10A 2024 — 141/150",
		start: "2024",
		end: "2024",
		category: "math",
		featured: true,
	},
	{
		id: "aime-2025",
		title: "AIME II 2025 — 9/15",
		start: "2025",
		end: "2025",
		category: "math",
	},
	{
		id: "maml",
		title: "MAML Olympiad Level 1 — 2nd in Massachusetts (24/25)",
		start: "2024",
		end: "2024",
		category: "math",
	},
	{
		id: "imlem",
		title: "IMLEM (Weston MS) — #1 individual, perfect scores across all 5 meets",
		start: "2022",
		end: "2023",
		category: "math",
	},
	{
		id: "amc-2023",
		title: "AMC 12B / 10A 2023 — 102/150 & 117.5/150 (both advanced to AIME)",
		start: "2023",
		end: "2023",
		category: "math",
	},

	// ── Competitive Programming ──────────────────────────────────────────
	{
		id: "usaco-gold",
		title: "USACO 2026 — advanced to Gold (900/1000)",
		start: "2026",
		end: "2026",
		category: "cp",
		featured: true,
	},
	{
		id: "codeforces",
		title: "Codeforces — rating 1737",
		role: "genius0412",
		start: "2024",
		end: "present",
		category: "cp",
		description: "Active competitive programmer; peak rating 1737.",
		links: [{ label: "Profile", href: "https://codeforces.com/profile/genius0412" }],
	},
	{
		id: "mitit",
		title: "MITIT Winter 2023 — 2nd, Beginner Division (team)",
		start: "2023",
		end: "2023",
		category: "cp",
	},
	{
		id: "usaco-guide-tournament",
		title: "USACO.guide Informatics Tournament 2024 — 8th, solo",
		start: "2024",
		end: "2024",
		category: "cp",
	},
	{
		id: "koi",
		title: "Korean Olympiad in Informatics — Silver (National 2021; Regional 2021 & 2022)",
		start: "2021",
		end: "2022",
		category: "cp",
	},
	{
		id: "early-cp",
		title: "National Software Thinking Olympiad — Bronze (2019); USACO Silver, perfect 1000 (2019)",
		start: "2019",
		end: "2019",
		category: "cp",
	},

	// ── Software ─────────────────────────────────────────────────────────
	{
		id: "empower",
		title: "Empower Initiative",
		role: "Website Coordinator",
		start: "2024",
		end: "present",
		category: "software",
		description: "Coordinate and build the web presence for the Empower Initiative.",
		links: [
			{ label: "empowerinit.org", href: "https://empowerinit.org" },
			{ label: "GitHub", href: "https://github.com/genius0412/empower" },
		],
	},
	{
		id: "ftcdesign",
		title: "FTCDesign",
		role: "Major Contributor",
		category: "software",
		description: "Major contributor to FTCDesign, a resource for the FTC robotics community.",
		links: [{ label: "ftcdesign.org", href: "https://www.ftcdesign.org" }],
	},
	{
		id: "configlib",
		title: "Configlib",
		role: "Major Contributor",
		category: "software",
		description: "Major contributor to Configlib.",
		links: [{ label: "configlib.framer.website", href: "https://configlib.framer.website" }],
	},
	{
		id: "a11y-checker",
		title: "A11y Checker — Congressional App Challenge, 2nd place",
		start: "2024",
		end: "2024",
		category: "software",
		description:
			"An accessibility checker that placed 2nd in the Congressional App Challenge (Office of Rep. Katherine Clark).",
		links: [{ label: "Demo (YouTube)", href: "https://youtu.be/qvqzYHCsRM8" }],
	},
	{
		id: "voya",
		title: "Voya — choose-your-own-adventure study game",
		category: "software",
		description: "A choose-your-own-adventure study game.",
		links: [{ label: "voya.dohunkim.xyz", href: "https://voya.dohunkim.xyz" }],
	},

	// ── Music ────────────────────────────────────────────────────────────
	{
		id: "town-criers",
		title: "Weston Town Criers (a cappella) — soloist on \"500 Miles\"",
		role: "Soloist",
		start: "2025",
		end: "2026",
		category: "music",
		description: "Member of the Town Criers a cappella group; soloist on \"500 Miles.\"",
	},
	{
		id: "choirs",
		title: "Concert Choir & Jazz Choir — Weston High School",
		category: "music",
	},
	{
		id: "mmea",
		title: "MMEA Districts — Junior 7th (tenor) & 8th (bass); Senior 9th & 10th (bass)",
		category: "music",
	},

	// ── Athletics ────────────────────────────────────────────────────────
	{
		id: "tennis",
		title: "Weston High School Tennis",
		category: "athletics",
	},

	// ── Education ────────────────────────────────────────────────────────
	{
		id: "weston-hs",
		title: "Weston High School",
		start: "2024",
		end: "present",
		category: "education",
		description:
			"GPA 4.0 (unweighted). AP coursework & exams: Physics C Mechanics & E&M (A), Calculus BC (5), Computer Science A (5), Statistics (A), World History (A).",
	},
	{
		id: "hanyang",
		title: "Hanyang University — Gifted & Talented Center for Informatics, Seoul",
		role: "Advanced Course in Informatics",
		start: "2020",
		end: "2021",
		category: "education",
		description:
			"Graduated #1 of 95 and youngest in the cohort; selected for a 1-on-1 AI course under Prof. Ki Hyuk Sung.",
	},
];

// ── Derived helpers ────────────────────────────────────────────────────

export function itemById(id: string): PortfolioItem | undefined {
	return items.find((i) => i.id === id);
}

export function itemsByCategory(category: Category): PortfolioItem[] {
	return items.filter((i) => i.category === category).sort(byNewest);
}

// Newest-first: use the largest 4-digit year found in end/start. "present" wins.
function yearOf(item: PortfolioItem): number {
	const fields = [item.end, item.start];
	let best = -1;
	for (const f of fields) {
		if (!f) continue;
		if (/present/i.test(f)) return 9999;
		const m = f.match(/(\d{4})/);
		if (m) best = Math.max(best, parseInt(m[1], 10));
	}
	return best;
}

export function byNewest(a: PortfolioItem, b: PortfolioItem): number {
	return yearOf(b) - yearOf(a);
}
