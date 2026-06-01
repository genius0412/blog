"use client";

import UpdateViewCount from "@/components/UpdateViewCount";
import { prettierDate } from "@/components/utils";
import Markdown from "markdown-to-jsx";
import { FaEye, FaHeart } from "react-icons/fa";
import { FiArrowLeft } from "react-icons/fi";
import Link from "next/link";
import { useState, useEffect } from "react";

const Post = (props: any) => {
	const slug = props.slug;
	const postContent = props.postContent;
	const views = props.views;

	const [likes, setLikes] = useState<number>(props.likes ?? 0);
	const [liked, setLiked] = useState<boolean>(false);

	useEffect(() => {
		const fetchLiked = async () => {
			const isliked = await fetch(`/api/likes?slug=${slug}`, { method: "GET" })
				.then((res) => res.json())
				.then((data) => data.liked);
			setLiked(isliked);
		};
		fetchLiked();
	}, [slug]);

	const toggleClick = async () => {
		setLikes(liked ? likes - 1 : likes + 1);
		setLiked(!liked);
		await fetch(`/api/likes?slug=${slug}`, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ slug: slug }),
		});
	};

	return (
		<div className="mx-auto max-w-3xl px-5 pb-16 pt-10 sm:px-8">
			<UpdateViewCount slug={slug} />

			<Link
				href="/blog"
				className="inline-flex items-center gap-1 text-sm text-muted hover:text-accent"
			>
				<FiArrowLeft className="h-4 w-4" />
				Back to blog
			</Link>

			<div className="mt-6 flex flex-wrap items-center gap-2 text-sm text-muted">
				<span>Dohun Kim</span>
				<span className="h-1 w-1 rounded-full bg-border" />
				<span>{prettierDate(postContent.data.date)}</span>
				<span className="h-1 w-1 rounded-full bg-border" />
				<span className="flex items-center gap-1">
					<FaEye className="fill-muted" /> {views} view{views == "1" ? "" : "s"}
				</span>
				<span className="h-1 w-1 rounded-full bg-border" />
				<span className="flex items-center gap-1">
					<FaHeart
						onClick={toggleClick}
						className={"cursor-pointer " + (liked ? "fill-accent" : "fill-muted")}
					/>{" "}
					{likes} like{likes == 1 ? "" : "s"}
				</span>
			</div>

			<h1 className="mt-4 font-serif text-4xl font-semibold text-ink sm:text-5xl">
				{postContent.data.title}
			</h1>
			{postContent.data.subtitle ? (
				<p className="mt-2 text-2xl text-muted">{postContent.data.subtitle}</p>
			) : null}

			<Markdown className="prose-warm mt-10">{postContent.content}</Markdown>
		</div>
	);
};

export default Post;
