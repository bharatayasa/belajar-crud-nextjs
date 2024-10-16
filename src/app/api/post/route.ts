import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const GET = async () => {
    try {
        const posts = await prisma.post.findMany({})
        return NextResponse.json({
            posts
        })
    } catch (error) {
        console.error('Error get post:', error);
        return NextResponse.json({
            message: 'Failed to get post'
        }, { status: 500 });
    }
};

export const POST = async (req: NextRequest) => {
    try {
        const { title, content } = await req.json();
    
        const post = await prisma.post.create({
            data: {
                title, 
                content,
            },
        });
        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error creating post:', error);
        return NextResponse.json({
            message: 'Failed to create post'
        }, { status: 500 });
    }
};

export const DELETE = async(req: NextRequest) => {
    try {
        const url = new URL(req.url).searchParams
        const id = Number(url.get('id')) || 0

        const post = await prisma.post.delete({
            where:{
                id: id
            } 
        })

        if (!post) {
            return NextResponse.json({ 
                message: "error"
            }), { status: 500 };
        }

        return NextResponse.json({ });
    } catch (error) {
        console.error('Error deleting post:', error);
        return NextResponse.json({
            message: 'Failed to delete post'
        }, { status: 500 });
    }
}
