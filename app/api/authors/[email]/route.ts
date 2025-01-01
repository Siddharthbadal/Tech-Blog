import prisma from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: {email:string}}) {
    try{
        const email = params.email ;
        const authorPosts = await prisma.user.findUnique({ where: {email}, 
        include:
        {posts:{
            orderBy: {createdAt: "desc"}},
        }
        });
        return NextResponse.json(authorPosts)
    }
    catch (error){
        return NextResponse.json({message: "Could not fetch this author's posts!"})
    }
    
}