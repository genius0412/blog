import fs from 'fs';
import matter from 'gray-matter'
import { PostMetadata } from "@/components/PostMetadata";
import path from 'path';

export const getPostContent = async (slug: string) => {
	const folder = path.join(process.cwd(), "src/posts/");
	const content = fs.readFileSync(`${folder}${slug}.md`, 'utf8');
	const mattered = matter(content);
	return {data: mattered.data, content: mattered.content};
}

export const getPostMetadata = () : PostMetadata[] => {
	const folder = path.join(process.cwd(), "src/posts/");
	const markdownPosts = fs.readdirSync(folder).filter((file) => file.endsWith('.md'));

	const posts = markdownPosts.map((fileName) => {
		const fileContents = fs.readFileSync(folder+fileName, 'utf8');
		const matterResult = matter(fileContents)
		return {
			title: String(matterResult.data.title),
			date: String(matterResult.data.date),
			subtitle: String(matterResult.data.subtitle),
			slug: fileName.replace(".md", "")
		};
	}).sort((a: PostMetadata, b: PostMetadata) => {
		const da = new Date(a.date), db = new Date(b.date);
		if(da < db) return 1;
		else if(da > db) return -1;
		else return 0;
	})
	
	return posts;
}

export const getHash = async (ip: string) => {
	const hashBuffer = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hash = hashArray.map((b) => b.toString(16).padStart(2, '0'));
	return hash;
}

export const prettierDate = (date: string) => {
	return (new Date(date)).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}