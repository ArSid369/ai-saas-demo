import { NextRequest,NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client/extension";


const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    try {
        const videos = await prisma.videos.findMany({ orderby: { createdAt: "desc" } })
        return NextResponse.json(videos)
    } catch (error: any) {
        return NextResponse.json(
            {message: 'error fetching videos'}, 
            {status: 500})
    } finally {
        await prisma.$disconnect()
    }
}