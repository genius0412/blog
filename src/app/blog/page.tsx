import type { Metadata } from "next";
import getPostMetadata from "@/components/getPostMetadata";
import PostPreview from "@/components/PostPreview";
import FadeIn from "@/components/motion/FadeIn";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
	title: "Blog",
	description: "Writing by Dohun Kim.",
};

export default async function Blog() {
	const postMetadata = getPostMetadata();

	return (
		<>
			<main className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-8">
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
