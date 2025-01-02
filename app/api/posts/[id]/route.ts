import { authOptions } from "@/app/utilis/authoptions";
import prisma from "@/lib/prismadb";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function GET(req: Request, {params}:{params: Promise<{id:string}>}) {
    try{
        const {id} = await params
    const post = await prisma.post.findUnique({ where: {id}});
    return NextResponse.json(post)
    }
    catch (error){
        return NextResponse.json({message: "Could not fetch this post!"})
    }
    
}


export async function PUT(req: Request, {params}:{params: Promise<{id:string}>}) {
    const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error: "Not authenticated"}, {status: 401})
        }
    const { title, content, links, selectedCategory, imageUrl, publicId} = await req.json();
    const {id} = await params
    try {
        const post = await prisma.post.update({
        where: {id},
        data: {
        title, content, links, categoryName:selectedCategory, 
        imageUrl, publicId
    },
     });
     return NextResponse.json(post)

    } catch (error){
        return NextResponse.json({ message: "error editing post."})
    }
}

export async function DELETE(req: Request, {params}:{params: Promise<{id:string}>}){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error: "Not authenticated"}, {status: 401})
    }
    
    const {id} = await params
    try{
        const post = await prisma.post.delete({where: {id}});
        return NextResponse.json(post)
    } catch (error){
        return NextResponse.json({message: "Error deleteing the post"})
    }
}