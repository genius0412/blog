import fs from "fs";
import path from "path";
import crypto from "crypto";
import type { Metadata } from "next";
import { FiDownload } from "react-icons/fi";
import Footer from "@/components/Footer";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: "Résumé",
	description:
		"Dohun Kim's résumé: math research, FTC robotics, competitive programming, and software projects. Readable in-page or downloadable as a PDF.",
	path: "/resume",
});

/**
 * A short hash of the PDF's contents, appended to its URL.
 *
 * /resume.pdf is a fixed path, so replacing the file leaves browsers, the
 * embedded PDF viewer, and Vercel's CDN serving whatever they cached the first
 * time — a new résumé silently doesn't appear. Keying the URL to the bytes
 * means the URL changes exactly when the file does, and never otherwise.
 *
 * Read at build time (this page is statically prerendered).
 */
function resumeVersion(): string {
	try {
		const buf = fs.readFileSync(path.join(process.cwd(), "public/resume.pdf"));
		return crypto.createHash("sha1").update(buf).digest("hex").slice(0, 8);
	} catch {
		return "";
	}
}

// Plain, document-first résumé page (spec §7). Displays the uploaded
// public/resume.pdf with a prominent Download button. No generation step —
// to update, rebuild resume/resume.tex and copy it over public/resume.pdf.
export default function ResumePage() {
	const v = resumeVersion();
	const pdfUrl = v ? `/resume.pdf?v=${v}` : "/resume.pdf";

	return (
		<>
			<main id="main-content" tabIndex={-1} className="mx-auto max-w-4xl px-5 pb-16 pt-12 sm:px-8">
				<div className="flex flex-wrap items-center justify-between gap-4">
					<h1 className="font-serif text-4xl font-semibold text-ink">Résumé</h1>
					<a
						href={pdfUrl}
						download="Dohun-Kim-Resume.pdf"
						className="inline-flex items-center gap-1.5 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white shadow-soft transition-colors hover:bg-accent/90"
					>
						<FiDownload className="h-4 w-4" />
						Download PDF
					</a>
				</div>

				<div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-soft">
					<iframe src={pdfUrl} title="Dohun Kim: Résumé" className="h-[80vh] w-full" />
				</div>
				<p className="mt-3 text-sm text-muted">
					Last updated:{" "}
					<code className="rounded bg-accent-soft px-1 py-0.5 text-accent">2026-07-27</code>
				</p>
			</main>
			<Footer />
		</>
	);
}
