import type { Metadata } from "next";
import { FiDownload } from "react-icons/fi";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Résumé",
	description: "Dohun Kim's résumé.",
};

// Plain, document-first résumé page (spec §7). Displays the uploaded
// public/resume.pdf with a prominent Download button. No generation step —
// to update, replace public/resume.pdf.
export default function ResumePage() {
	return (
		<>
			<main className="mx-auto max-w-4xl px-5 pb-16 pt-12 sm:px-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-serif text-4xl font-semibold text-ink">Résumé</h1>
					<a
						href="/resume.pdf"
						download
						className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent/90"
					>
						<FiDownload className="h-4 w-4" />
						Download PDF
					</a>
				</div>

				<div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
					<iframe
						src="/resume.pdf"
						title="Dohun Kim — Résumé"
						className="h-[80vh] w-full"
					/>
				</div>
				<p className="mt-3 text-sm text-muted">
					If the viewer is blank, the résumé PDF has not been uploaded yet — drop{" "}
					<code className="rounded bg-accent-soft px-1 py-0.5 text-accent">public/resume.pdf</code>{" "}
					into the repo.
				</p>
			</main>
			<Footer />
		</>
	);
}
