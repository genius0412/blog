import type { Metadata } from "next";
import getPostMetadata from "@/components/getPostMetadata";
import PostPreview from "@/components/PostPreview";
import FadeIn from "@/components/motion/FadeIn";
import Footer from "@/components/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_NAME, SITE_URL, absoluteUrl, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
	title: "Blog",
	description:
		"Notes on building things — writing by Dohun Kim on software, hardware, and the projects he takes apart along the way.",
	path: "/blog",
});

export default async function Blog() {
	const postMetadata = getPostMetadata();

	return (
		<>
			<JsonLd
				data={{
					"@type": "Blog",
					"@id": absoluteUrl("/blog#blog"),
					url: absoluteUrl("/blog"),
					name: `${SITE_NAME} — Blog`,
					description: "Notes on building things.",
					inLanguage: "en-US",
					author: { "@id": `${SITE_URL}/#person` },
					blogPost: postMetadata.map((post) => ({
						"@type": "BlogPosting",
						headline: post.title,
						url: absoluteUrl(`/blog/${post.slug}`),
						datePublished: post.date,
					})),
				}}
			/>
			<main id="main-content" tabIndex={-1} className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-8">
				<h1 className="font-serif text-4xl font-semibold text-ink sm:text-5xl">Blog</h1>
				<p className="mt-3 text-lg text-muted">Notes on building things.</p>
				<div className="mt-8 space-y-4">
					{postMetadata.map((post, i) => (
						<FadeIn key={post.slug} delay={i * 0.05}>
							<PostPreview {...post} />
						</FadeIn>
					))}
				</div>
			</main>
			<Footer />
		</>
	);
}
