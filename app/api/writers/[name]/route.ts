import { authOptions } from "@/app/utilis/authoptions";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: {name:string}}) {
        const session = await getServerSession(authOptions);        
        const authorName = session?.user?.name as string
    try{
        const author = params.name;        
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