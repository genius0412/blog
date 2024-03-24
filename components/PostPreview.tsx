import { PostMetadata } from './PostMetadata'
import Link from 'next/link'
import { Redis } from '@upstash/redis';
import { FaHeart, FaEye } from "react-icons/fa";
import prettierDate from './prettierDate';

const redis = Redis.fromEnv();

const PostPreview = async (props: PostMetadata) => {
	const slug = props.slug;

	const views: string|null = await redis.get(`views:post:${slug}`);
	const likes: string|null = await redis.get(`likes:post:${slug}`);

	return (
		<div key={props.slug} className="rounded-2xl border-green-400 dark:border-amber-200 border-2 px-4 py-3 w-full">
			<Link href={`/posts/${props.slug}`}>
				<div className="text-3xl font-extrabold">{props.title}</div>
			</Link>
			<div className="text-xl dark:text-slate-100 font-medium">{props.subtitle}</div>
			<div className="flex flex-row text-sm sm:text-md font-normal items-center space-x-1.5 md:space-x-2">
				<div className="dark:text-slate-400">{prettierDate(props.date)}</div>
				<div className="bg-slate-400 rounded-full w-1 h-1"></div>
				<div className="flex flex-row justify-center items-center space-x-0.5"><FaEye className='mr-1 fill-black dark:fill-white' /> {views} <span className="hidden sm:block"> view{views == "1" ? '' : 's'}</span></div>
				<div className="bg-slate-400 rounded-full w-1 h-1"></div>
				<div className="flex flex-row justify-center items-center space-x-0.5"><FaHeart fill="red" className='mr-1' /> {likes} <span className="hidden sm:block">like{likes == "1" ? '' : 's'}</span></div>
			</div>
		</div>
	)
}

export default PostPreview