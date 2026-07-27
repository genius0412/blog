import { profile } from "@/content/data";

// Quick credibility numbers (spec §5.1.3).
export default function StatStrip() {
	return (
		<div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
			{profile.stats.map((stat) => (
				<div
					key={stat.label}
					// px-3 rather than px-4: at the 6-column breakpoint cells are 150px,
					// and "141/150" at text-3xl left only 4px of clearance inside px-4.
					className="flex flex-col items-center justify-center rounded-xl border border-border bg-surface px-3 py-4 text-center shadow-soft"
				>
					<div className="font-serif text-2xl font-semibold text-accent sm:text-3xl">
						{stat.value}
					</div>
					{/* Reserve two lines for every label. Cells are vertically centred,
					    so a label that wraps makes its block taller and lifts its value
					    above the ones beside it — "FTC Worlds (Motivate)" sat 8px higher
					    than the rest. A common minimum height keeps every cell
					    structurally identical, wrapped or not. */}
					<div className="mt-1 min-h-[2.75em] text-xs leading-snug text-muted">
						{stat.label}
					</div>
				</div>
			))}
		</div>
	);
}
