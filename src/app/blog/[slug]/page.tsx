import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import getPostContent from '@/components/getPostContent';
import getPostMetadata from '@/components/getPostMetadata';
import JsonLd from '@/components/JsonLd';
import { Redis } from '@upstash/redis';
import { SITE_NAME, SITE_URL, absoluteUrl, markdownToPlainText, pageMetadata, truncateForMeta } from '@/lib/seo';
import Post from './Post';

const redis = Redis.fromEnv()

export const generateStaticParams = async () => {
	const posts = getPostMetadata();
	return posts.map((post) => ({
		slug: post.slug,
	}));
}

const findPost = (slug: string) => getPostMetadata().find((p) => p.slug === slug);

// Build a unique description per post: lead with the post's own prose so two
// posts never share a meta description, falling back to the subtitle only when
// the body is too short to say anything.
const describePost = (post: { title: string; subtitle: string }, body: string) => {
	const excerpt = markdownToPlainText(body);
	if (excerpt.length >= 60) return truncateForMeta(excerpt);
	return truncateForMeta(`${post.title} — ${post.subtitle}`);
}

export const generateMetadata = async (props: any): Promise<Metadata> => {
	const slug = props.params.slug;
	const post = findPost(slug);
	if (!post) return { title: 'Post not found', robots: { index: false, follow: false } };

	const { content } = await getPostContent(slug);
	return pageMetadata({
		title: post.title,
		description: describePost(post, content),
		path: `/blog/${slug}`,
		type: 'article',
		publishedTime: new Date(post.date).toISOString(),
	});
}

const postPage = async (props: any) => {
	const slug = props.params.slug;
	const post = findPost(slug);
	// Unknown slug: a real 404 rather than an unhandled fs throw. A 500 tells a
	// crawler the URL might come back; a 404 tells it not to.
	if (!post) notFound();

	const postContent = await getPostContent(slug);
	const likes: string | null = await redis.get(`likes:post:${slug}`);
	const views: string | null = await redis.get(`views:post:${slug}`);

	return (
		<>
			<JsonLd
				data={{
					'@type': 'BlogPosting',
					'@id': absoluteUrl(`/blog/${slug}#post`),
					mainEntityOfPage: absoluteUrl(`/blog/${slug}`),
					headline: post.title,
					description: describePost(post, postContent.content),
					datePublished: new Date(post.date).toISOString(),
					dateModified: new Date(post.date).toISOString(),
					inLanguage: 'en-US',
					author: { '@type': 'Person', name: SITE_NAME, url: SITE_URL },
					publisher: { '@id': `${SITE_URL}/#person` },
					isPartOf: { '@id': absoluteUrl('/blog#blog') },
				}}
			/>
			<Post slug={slug} postContent={postContent} views={views} likes={likes} />
		</>
	);
}

export default postPage;
