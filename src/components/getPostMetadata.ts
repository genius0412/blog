import fs from 'fs';
import matter from 'gray-matter'
import { PostMetadata } from "@/components/PostMetadata";
import path from 'path';

const getPostMetadata = () : PostMetadata[] => {
	const folder = path.join(process.cwd(), "src/posts/");
	const markdownPosts = fs.readdirSync(folder).filter((file) => file.endsWith('.md'));

	const posts: PostMetadata[] = markdownPosts.map((fileName) => {
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

export default getPostMetadata;