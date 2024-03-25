import { PostMetadata } from './PostMetadata'
import Link from 'next/link'
import { Redis } from '@upstash/redis';
import { FaHeart, FaEye } from "react-icons/fa";
import { headers } from 'next/headers'
import { getHash, prettierDate } from './utils';

const redis = Redis.fromEnv();

const PostPreview = async (props: PostMetadata) => {
	const slug = props.slug;

	const views: string|null = await redis.get(`views:post:${slug}`);
	const likes: string|null = await redis.get(`likes:post:${slug}`);

	const header = headers()
	const ip = (header.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	const hash = await getHash(ip);
	const liked: boolean|null = await redis.get(`deduplicate:${hash}:${slug}:likes`);

	return (
		<div key={props.slug} className="rounded-2xl border-green-400 dark:border-amber-200 border-2 px-4 py-3 w-full">
			<div className="text-3xl font-extrabold">
				<Link href={`/posts/${props.slug}`}>
					{props.title}
				</Link>
			</div>
			<div className="text-xl dark:text-slate-100 font-medium">{props.subtitle}</div>
			<div className="flex flex-row text-sm sm:text-md font-normal items-center space-x-1.5 md:space-x-2">
				<div className="dark:text-slate-400">{prettierDate(props.date)}</div>
				<div className="bg-slate-400 rounded-full w-1 h-1"></div>
				<div className="flex flex-row justify-center items-center space-x-0.5"><FaEye className='mr-1 fill-black dark:fill-white' /> {views} <span className="hidden sm:block"> view{views == "1" ? '' : 's'}</span></div>
				<div className="bg-slate-400 rounded-full w-1 h-1"></div>
				<div className="flex flex-row justify-center items-center space-x-0.5"><FaHeart className={'mr-1 ' + (liked ? "fill-red-600" : "fill-black dark:fill-white")} /> {likes} <span className="hidden sm:block">like{likes == "1" ? '' : 's'}</span></div>
			</div>
		</div>
	)
}

export default PostPreview