import { FiArrowUpRight } from "react-icons/fi";
import type { Link as LinkType } from "@/content/data";

// Renders a row of external links (arXiv, GitHub, Onshape, YouTube, …).
export default function LinkList({ links }: { links?: LinkType[] }) {
	if (!links || links.length === 0) return null;
	return (
		<div className="flex flex-wrap gap-x-4 gap-y-1.5">
			{links.map((l) => (
				<a
					key={l.href}
					href={l.href}
					target="_blank"
					rel="noopener noreferrer"
					className="inline-flex items-center gap-0.5 text-sm font-medium text-accent hover:underline"
				>
					{l.label}
					<FiArrowUpRight className="h-3.5 w-3.5" />
				</a>
			))}
		</div>
	);
}
