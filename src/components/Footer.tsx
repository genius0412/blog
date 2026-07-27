import Link from "next/link";
import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { profile } from "@/content/data";

// Quiet footer (spec §5.1.6).
const siteLinks = [
	{ href: "/", name: "Home" },
	{ href: "/portfolio", name: "Portfolio" },
	{ href: "/blog", name: "Blog" },
	{ href: "/resume", name: "Résumé" },
];

export default function Footer() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-5 py-10 text-sm text-muted sm:px-8">
				{/* Site links in the footer: every page links to every other, so
				    crawlers reach the whole site from any entry point. */}
				<nav aria-label="Footer" className="flex flex-wrap items-center justify-center gap-5">
					{siteLinks.map((l) => (
						<Link key={l.href} href={l.href} className="text-muted hover:text-ink">
							{l.name}
						</Link>
					))}
				</nav>
				<div className="flex w-full flex-col items-center gap-3 border-t border-border pt-4 sm:flex-row sm:justify-between">
					<div className="flex items-center gap-5">
						<a
							href={`mailto:${profile.email}`}
							className="inline-flex items-center gap-1.5 hover:text-ink"
						>
							<FiMail className="h-4 w-4" />
							Email
						</a>
						<a
							href={`https://github.com/${profile.github}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 hover:text-ink"
						>
							<FiGithub className="h-4 w-4" />
							GitHub
						</a>
						<a
							href={`https://linkedin.com/in/${profile.linkedin}`}
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center gap-1.5 hover:text-ink"
						>
							<FiLinkedin className="h-4 w-4" />
							LinkedIn
						</a>
					</div>
					<span>Built with Next.js.</span>
				</div>
			</div>
		</footer>
	);
}
