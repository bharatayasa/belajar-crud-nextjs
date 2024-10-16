'use client'
import { Post } from '@prisma/client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import React from 'react'

interface Props {
    post: Post
}

function Item({post}: Props) {
    const router = useRouter()
    const handleDelete = async (id:number) => {
        await fetch('/api/post?id=' + id, {
            method: 'DELETE',
        })
        router.refresh()
    }
    return (
        <div className="mt-5 p-5 bg-slate-400 rounded-lg">
            <div>
                <h1 className="text-xl font-bold">{post.title}</h1>
                <p>{post.content}</p>
                <p>{new Date(post.createdAt).toLocaleDateString()}</p>
                <p>{new Date(post.updatedAt).toLocaleDateString()}</p>
            </div>

                <div className="flex gap-5 mt-10">
                    <Link href={`/update/${post.id}`}>
                        <button className="bg-sky-500 py-3 px-5 rounded-md hover:bg-sky-600">Update</button>
                    </Link>
                    <button onClick={()=>handleDelete(post.id)} className="bg-pink-500 py-3 px-5 rounded-md hover:bg-pink-600">Delete</button>
            </div>
        </div>
    )
}

export default Item
