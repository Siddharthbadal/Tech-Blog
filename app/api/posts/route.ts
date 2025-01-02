import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/utilis/authoptions";


export async function POST(req: Request){
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({error: "Not authenticated"}, {status: 401})
    }


    const {title, content, links, selectedCategory, imageUrl, publicId} = await req.json();

    const authorEmail = session?.user?.email as string
    const authorName = session?.user?.name as string

    console.log(authorEmail)
    console.log(authorName)

    if (!title || !content ) {
        return NextResponse.json({error: "Title and content required"}, { status: 500});
    }

    try{
        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                links,
                imageUrl,
                categoryName: selectedCategory,
                publicId,
                authorEmail,                

            }
        });
        console.log("Post Created");
        return NextResponse.json(newPost);
    } catch (error){
        return NextResponse.json({message: "Failed to create post!"});
    }
}


export async function GET(){
    try{
        const posts = await prisma.post.findMany({
            include: {authorName: {select: {name:true}}}, orderBy:{
                createdAt: "desc"
        },
    });
    return NextResponse.json(posts)
    } catch(error){
        return NextResponse.json({message: "Unable to fetch posts!"} , 
            {status: 500}
        )
    }
}


