import { profile } from "@/content/data";

// Quick credibility numbers (spec §5.1.3).
export default function StatStrip() {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
			{profile.stats.map((stat) => (
				<div
					key={stat.label}
					className="rounded-xl border border-border bg-surface px-4 py-4 text-center shadow-soft"
				>
					<div className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
						{stat.value}
					</div>
					<div className="mt-1 text-xs leading-snug text-muted">{stat.label}</div>
				</div>
			))}
		</div>
	);
}
