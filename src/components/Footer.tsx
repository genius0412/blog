import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/data";

// Quiet footer (spec §5.1.6).
//
// One band, one rule. An earlier version put the site nav on its own centred
// line above a second border-t, which stranded it between two hairlines 77px
// apart and set a centred row over a justified one. Nav left, contact right,
// credit under — a single alignment story.
const siteLinks = [
	{ href: "/", name: "Home" },
	{ href: "/portfolio", name: "Portfolio" },
	{ href: "/blog", name: "Blog" },
	{ href: "/resume", name: "Résumé" },
];

const contactLinkClass = "inline-flex items-center gap-1.5 hover:text-ink";

export default function Footer() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto max-w-5xl px-5 py-10 sm:px-8">
				<div className="flex flex-col items-center gap-6 text-sm text-muted sm:flex-row sm:justify-between sm:gap-8">
					{/* Site links in the footer: every page links to every other, so
					    crawlers reach the whole site from any entry point. */}
					<nav
						aria-label="Footer"
						className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
					>
						{siteLinks.map((l) => (
							<Link key={l.href} href={l.href} className="text-muted hover:text-ink">
								{l.name}
							</Link>
						))}
					</nav>

					<div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
						<a href={`mailto:${profile.email}`} className={contactLinkClass}>
							<FiMail className="h-4 w-4" />
							Email
						</a>
						<a
							href={`https://github.com/${profile.github}`}
							target="_blank"
							rel="noopener noreferrer"
							className={contactLinkClass}
						>
							<FiGithub className="h-4 w-4" />
							GitHub
						</a>
						<a
							href={`https://linkedin.com/in/${profile.linkedin}`}
							target="_blank"
							rel="noopener noreferrer"
							className={contactLinkClass}
						>
							<FiLinkedin className="h-4 w-4" />
							LinkedIn
						</a>
					</div>
				</div>

				<p className="mt-8 text-center text-xs text-muted">Built with Next.js.</p>
			</div>
		</footer>
	);
}
