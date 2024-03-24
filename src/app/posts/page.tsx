import { getPostMetadata } from "@/components/utils";
import PostPreview from "@/components/PostPreview";

export default function Posts() {
	const postMetadata = getPostMetadata();
	const postPreviews = postMetadata.map((post) => (
		<PostPreview key={post.slug} {...post} />
	));

	return (
		<main className="flex min-h-screen w-screen flex-col justify-center items-center">
			<div className="flex flex-col w-11/12 md:w-3/4 xl:max-w-lg justify-center items-start space-y-3">
				<h1 className="pl-2 font-black text-4xl">All Posts</h1>
				{postPreviews}
			</div>
		</main>
	);
}