"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
	children: ReactNode;
	className?: string;
	delay?: number;
	/** vertical offset (px) the element rises from */
	y?: number;
	/** animate on scroll-into-view (default) vs immediately on mount */
	onView?: boolean;
};

// Gentle fade/slide-up. When the user prefers reduced motion, content renders
// statically with no transform or transition (spec §2, §3 Motion).
export default function FadeIn({
	children,
	className,
	delay = 0,
	y = 16,
	onView = true,
}: FadeInProps) {
	const reduce = useReducedMotion();

	if (reduce) {
		return <div className={className}>{children}</div>;
	}

	const animateProps = onView
		? { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" } }
		: { animate: { opacity: 1, y: 0 } };

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y }}
			transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
			{...animateProps}
		>
			{children}
		</motion.div>
	);
}
