import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { categoryMeta } from "@/content/data";
import { categoryStyle } from "./ui/categoryStyle";

// Cards linking into /portfolio anchors (spec §5.1.4).
export default function SectionPreview() {
	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
			{categoryMeta
				.filter((c) => c.id !== "education")
				.map((c) => {
					const cs = categoryStyle[c.id];
					const Icon = cs.Icon;
					return (
						<Link
							key={c.id}
							href={`/portfolio#${c.id}`}
							className={`group flex flex-col rounded-2xl border border-l-4 border-border ${cs.barL} bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift`}
						>
							<div className="flex items-center gap-3">
								<span
									aria-hidden
									className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${cs.border} ${cs.bg} ${cs.text}`}
								>
									<Icon className="h-5 w-5" />
								</span>
								<h3 className="font-serif text-lg font-semibold text-ink">{c.label}</h3>
							</div>
							<p className="mt-2 flex-1 text-sm text-muted">{c.tagline}</p>
							<span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent">
								view
								<FiArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
							</span>
						</Link>
					);
				})}
		</div>
	);
}
