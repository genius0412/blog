"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import type { ReactNode } from "react";

// Modal overlay for intercepted detail routes (spec §5.5).
// Closes via ✕, backdrop click, and Esc; navigates back so the URL restores.
export default function Modal({ children }: { children: ReactNode }) {
	const router = useRouter();
	const reduce = useReducedMotion();
	const overlayRef = useRef<HTMLDivElement>(null);

	const onClose = useCallback(() => router.back(), [router]);

	useEffect(() => {
		const onKey = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", onKey);
		// Lock background scroll while the modal is open.
		const prev = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		return () => {
			document.removeEventListener("keydown", onKey);
			document.body.style.overflow = prev;
		};
	}, [onClose]);

	const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
		if (e.target === overlayRef.current) onClose();
	};

	const duration = reduce ? 0 : 0.2;

	return (
		<AnimatePresence>
			<motion.div
				ref={overlayRef}
				onMouseDown={onBackdrop}
				role="dialog"
				aria-modal="true"
				className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 backdrop-blur-sm sm:p-8"
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration }}
			>
				<motion.div
					className="relative my-8 w-full max-w-2xl rounded-2xl border border-border bg-surface p-6 shadow-lift sm:p-9"
					initial={{ opacity: 0, y: reduce ? 0 : 12 }}
					animate={{ opacity: 1, y: 0 }}
					exit={{ opacity: 0, y: reduce ? 0 : 12 }}
					transition={{ duration }}
				>
					<button
						onClick={onClose}
						aria-label="Close"
						className="absolute right-4 top-4 rounded-full p-1.5 text-muted transition-colors hover:bg-accent-soft hover:text-accent"
					>
						<FiX className="h-5 w-5" />
					</button>
					{children}
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
