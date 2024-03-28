"use client";

import UpdateViewCount from "@/components/UpdateViewCount";
import { prettierDate } from "@/components/utils";
import Markdown from "markdown-to-jsx";
import { FaEye, FaHeart } from "react-icons/fa";
import { useState, useEffect } from 'react';

const Post = (props: any) => {
	const slug = props.slug;
	const postContent = props.postContent;
	const views = props.views;
	
	const [likes, setLikes] = useState<number>(props.likes);
	const [liked, setLiked] = useState<boolean>(false);

	useEffect(() => {
		const fetchLiked = async () => {
			const isliked = await fetch(`/api/likes?slug=${slug}`, {
				method: 'GET'
			}).then(res => res.json()).then(data => data.liked);
			setLiked(isliked);
		}
		fetchLiked();
	}, [])

	const toggleClick = async () => {
		if(liked) setLikes(likes-1);
		else setLikes(likes+1);
		setLiked(!liked);
		await fetch(`/api/likes?slug=${slug}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({"slug": slug}),
		});
	}

	return (
		<div className="flex flex-col w-screen h-screen justify-center items-center">
			<UpdateViewCount slug={slug} />
			<div className="flex flex-col w-[90%] xl:w-3/5 py-5 min-h-screen justify-start items-start">
				<div className="flex flex-col sm:flex-row w-full h-auto sm:items-center sm:space-x-2">
					<div className='flex flex-row space-x-2 justify-start items-center'>
						<div className="text-slate-700 dark:text-gray-200">Dohun Kim</div>
						<div className="block bg-slate-400 rounded-full w-1 h-1"></div>
						<div className="text-slate-700 dark:text-gray-200">{prettierDate(postContent.data.date)}</div>
						<div className="hidden sm:block bg-slate-400 rounded-full w-1 h-1"></div>
					</div>
					<div className="flex flex-row space-x-2 justify-start items-center">
						<div className="flex flex-row justify-center items-center space-x-1"><FaEye className='mr-1 fill-black dark:fill-white' /> {views} <span className=""> view{views == "1" ? '' : 's'}</span></div>
						<div className="block bg-slate-400 rounded-full w-1 h-1"></div>
						<div className="flex flex-row justify-center items-center space-x-1"><FaHeart onClick={() => toggleClick()} className={"mr-1 cursor-pointer " + (liked ? "fill-red-600" : "fill-black dark:fill-white")} /> {likes} <span className="">like{likes == 1 ? '' : 's'}</span></div>
					</div>
				</div>
				<div className="text-4xl md:text-5xl text-black dark:text-white font-black">{postContent.data.title}</div>
				<div className="text-2xl md:text-3xl text-gray-400">{postContent.data.subtitle}</div>
				<Markdown className="mt-12 w-full prose prose-h1:m-0 prose-h2:m-0 prose-strong:text-emerald-600 dark:prose-strong:text-amber-200  dark:prose-invert">{postContent.content}</Markdown>
			</div>
		</div>
	)
}

export default Post