import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: {categoryName:string}}) {
    try{
        const categoryName = params.categoryName 
    const posts = await prisma.category.findUnique({ where: {categoryName}, 
    include:{posts: {include: {authorName: true},
        orderBy: {createdAt: "desc"}
    }}
    });
    return NextResponse.json(posts)
    }
    catch (error){
        return NextResponse.json({message: "Could not fetch this post!"})
    }
    
}