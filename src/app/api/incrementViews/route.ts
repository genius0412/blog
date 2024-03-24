import { NextRequest, NextResponse } from "next/server";
import { Redis } from "@upstash/redis";
import { getHash } from "@/components/utils";

const redis = Redis.fromEnv();
export const runtime = "edge";

export async function POST(req: NextRequest): Promise<NextResponse>{
	const body = await req.json();
	let slug: string | undefined = undefined;
	if('slug' in body) slug = body.slug;

	if(!slug) {
		return new NextResponse('Slug not found', { status: 400 });
	}

	const ip: string = req.ip ? req.ip : (req.headers.get('x-forwarded-for') ?? '127.0.0.1').split(',')[0]
	console.log(ip)
	if(ip){
		const hash = await getHash(ip)
		const key = `deduplicate:${hash}:${slug}:views`
		const isNew = await redis.get(key);
		
		if(isNew === undefined || isNew === null) await redis.set(key, true);
		else return new NextResponse('Already Viewed!', { status: 400 })
	}
	await redis.incr(`views:post:${slug}`);
	return new NextResponse(null, { status: 202 });
}