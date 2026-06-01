import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost";

const styles: Record<Variant, string> = {
	primary:
		"bg-accent text-white hover:bg-accent/90 border border-transparent shadow-soft",
	ghost: "bg-transparent text-ink border border-border hover:border-accent hover:text-accent",
};

const base =
	"inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2.5 text-sm font-medium transition-colors";

type Props = {
	href: string;
	children: ReactNode;
	variant?: Variant;
	external?: boolean;
};

// Solid amber primary / ghost secondary button (spec §3 Components).
export default function Button({ href, children, variant = "primary", external }: Props) {
	const className = `${base} ${styles[variant]}`;
	if (external) {
		return (
			<a href={href} target="_blank" rel="noopener noreferrer" className={className}>
				{children}
			</a>
		);
	}
	return (
		<Link href={href} className={className}>
			{children}
		</Link>
	);
}
