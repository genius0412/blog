import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getHash } from "@/components/utils";

const redis = Redis.fromEnv();
export const runtime = "edge";

export async function GET(req: NextRequest): Promise<NextResponse>{
	const slug = req.nextUrl.searchParams.get('slug')
	const ip = req.ip ? req.ip : (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	if(!slug) {
		return new NextResponse('Slug not found', { status: 400 });
	}
	if(!ip){
		return NextResponse.json({ "liked": false }, { status: 200 });
	}

	const hash = await getHash(ip);
	const liked = await redis.get(`deduplicate:${hash}:${slug}:likes`);
	if(liked == undefined || liked == null || liked == false) return NextResponse.json({ "liked": false }, { status: 200 });
	return NextResponse.json({ "liked": true }, { status: 200 });
}

export async function POST(req: NextRequest): Promise<NextResponse>{
	const body = await req.json();
	let slug: string | undefined = undefined;
	if('slug' in body) slug = body.slug;

	if(!slug) {
		return new NextResponse('Slug not found', { status: 400 });
	}

	const ip = req.ip ? req.ip : (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	if(!ip) return new NextResponse('IP Not found', { status: 400 })
	const hash = await getHash(ip);
	const keyDedup: string = `deduplicate:${hash}:${slug}:likes`;
	const keyPost: string = `likes:post:${slug}`;
	const state = await redis.get(keyDedup);

	if(state === undefined || state === null || state === false){
		await redis.set(keyDedup, true);
		await redis.incr(keyPost);
	} else {
		await redis.set(keyDedup, false);
		await redis.decr(keyPost);
	}
	return new NextResponse(null, { status: 202 });
}