import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();
const targets: string[] = ["views", "likes"];

export async function GET(req: NextRequest): Promise<NextResponse> {
	const slug = req.nextUrl.searchParams.get('slug')
	console.log(slug);
	if(!slug) {
		return new NextResponse('Slug not found', { status: 400 });
	}

	let finalObject = "{";
	for(const item of targets){
		const num = await redis.get(`${item}:post:${slug}`);
		finalObject += `\"${item}\": ${num},`;
	}
	finalObject += "}";

	console.log(finalObject);
	return new NextResponse(JSON.parse(finalObject), { status: 200 });
}