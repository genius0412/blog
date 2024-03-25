'use server';

import fs from 'fs';
import matter from 'gray-matter'
import path from 'path';

const getPostContent = async (slug: string) => {
	const folder = path.join(process.cwd(), "src/posts/");
	const content = fs.readFileSync(`${folder}${slug}.md`, 'utf8');
	const mattered = matter(content);
	return {data: mattered.data, content: mattered.content};
}

export default getPostContent;