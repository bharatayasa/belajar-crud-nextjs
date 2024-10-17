import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()

export const GET = async (req: NextRequest, context: { params: { id: string } }) => {
    try {
        const id  = (Number(context.params.id))

        const post = await prisma.post.findFirst({
            where:{
                id: id
            }
        })

        return NextResponse.json({
            post
        })

    } catch (error) {
        console.error('Error get post:', error);
        return NextResponse.json({
            message: 'Failed to get post'
        }, { status: 500 });
    }
};

export const PUT = async (req: NextRequest, { params }: { params: { id: string } }) => {
    try {
        const { title, content } = await req.json();
        const id = Number(params.id);

        if (isNaN(id) || id <= 0) {
            return NextResponse.json({ message: 'Invalid post ID' }, { status: 400 });
        }

        const post = await prisma.post.update({
            where: { id: id },
            data: {
                title, 
                content,
            },
        });

        return NextResponse.json({ post });
    } catch (error) {
        console.error('Error updating post:', error);
        return NextResponse.json({
            message: 'Failed to update post'
        }, { status: 500 });
    }
};
