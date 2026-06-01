import type { ReactNode } from "react";

// Small "pill" for skills / interests / tags (spec §3 Components).
export default function Pill({ children }: { children: ReactNode }) {
	return (
		<span className="inline-flex items-center rounded-full border border-border bg-surface px-3 py-1 text-sm text-muted">
			{children}
		</span>
	);
}
