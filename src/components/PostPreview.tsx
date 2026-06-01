import { PostMetadata } from './PostMetadata'
import Link from 'next/link'
import { Redis } from '@upstash/redis';
import { FaHeart, FaEye } from "react-icons/fa";
import { headers } from 'next/headers'
import { getHash, prettierDate } from './utils';

const redis = Redis.fromEnv();

const PostPreview = async (props: PostMetadata) => {
	const slug = props.slug;

	const views: string | null = await redis.get(`views:post:${slug}`);
	const likes: string | null = await redis.get(`likes:post:${slug}`);

	const header = headers()
	const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	const hash = await getHash(ip);
	const liked: boolean | null = await redis.get(`deduplicate:${hash}:${slug}:likes`);

	return (
		<Link
			href={`/blog/${props.slug}`}
			className="group block rounded-2xl border border-border bg-surface p-5 shadow-soft transition-shadow hover:shadow-lift"
		>
			<h2 className="font-serif text-2xl font-semibold text-ink group-hover:text-accent">
				{props.title}
			</h2>
			<p className="mt-1 text-lg text-muted">{props.subtitle}</p>
			<div className="mt-3 flex flex-row items-center gap-2 text-sm text-muted">
				<span>{prettierDate(props.date)}</span>
				<span className="h-1 w-1 rounded-full bg-border" />
				<span className="flex items-center gap-1">
					<FaEye className="fill-muted" /> {views ?? 0}
				</span>
				<span className="h-1 w-1 rounded-full bg-border" />
				<span className="flex items-center gap-1">
					<FaHeart className={liked ? "fill-accent" : "fill-muted"} /> {likes ?? 0}
				</span>
			</div>
		</Link>
	)
}

export default PostPreview
