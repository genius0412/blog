import type { ReactNode } from "react";

// Small "pill" for skills / interests / tags (spec §3 Components).
// `accent` gives an emphasized variant for a headline stat (e.g. GPA).
export default function Pill({ children, accent = false }: { children: ReactNode; accent?: boolean }) {
	const tone = accent
		? "border-accent/30 bg-accent-soft font-medium text-accent"
		: "border-border bg-surface text-muted";
	return (
		<span className={`inline-flex items-center rounded-full border px-3 py-1 text-sm ${tone}`}>
			{children}
		</span>
	);
}
