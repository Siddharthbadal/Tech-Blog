import prisma from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request){
    const {title, content, links, selectedCategory, imageUrl, publicId} = await req.json();

    const authorEmail = 'indiandevcom@gmail.com'
    const authorName = 'indidev'

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


