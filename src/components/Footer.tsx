import { FiGithub, FiMail } from "react-icons/fi";
import { profile } from "@/content/data";

// Quiet footer (spec §5.1.6).
export default function Footer() {
	return (
		<footer className="border-t border-border">
			<div className="mx-auto flex max-w-5xl flex-col items-center gap-3 px-5 py-10 text-sm text-muted sm:flex-row sm:justify-between sm:px-8">
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
				</div>
				<span>Built with Next.js.</span>
			</div>
		</footer>
	);
}
