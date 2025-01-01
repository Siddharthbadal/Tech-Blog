import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: {name:string}}) {
    try{
        const authorName = params.name ;
        console.log(authorName)
        const authorPosts = await prisma.user.findUnique({ where: {author}, 
        include:
        {posts:{
            orderBy: {createdAt: "desc"}},
        }
        });
        return NextResponse.json(authorPosts)
    }
    catch (error){
        return NextResponse.json({message: "Could not fetch this author's posts by this name!"})
    }
    
}