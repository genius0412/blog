'use server';

import fs from 'fs';
import matter from 'gray-matter';

const getPostContent = async (slug: string) => {
	const folder = "posts/"
	const content = fs.readFileSync(`${folder}${slug}.md`, 'utf8');
	const mattered = matter(content);
	return {data: mattered.data, content: mattered.content};
}

export default getPostContent;