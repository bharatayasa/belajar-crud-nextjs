'use client'
import React, { useEffect, useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';

const Update = (
    {
        params, 
    }:{
        params: {id: string}
    }
) => {
    const id = params.id
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    const router = useRouter()

    const getData = async () => {
        const res = await fetch(`/api/post/${id}`)
        const json = await res.json()
        
        if (!json) {
            router.push('/404')
            return;
        }

        setTitle(json.post.title)
        setContent(json.post.content)
    }

    useEffect(() => {
        getData()
    }, [])

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        console.log(title, content);

        await fetch(`/api/post/`+id, {
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                title, 
                content
            })
        }).then((res) => {
            console.log(res);
        }).catch((e) => {
            console.log(e);
        })

        router.replace('/');
    }

    return (
        <div className="w-[1000px] mx-auto pt-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full text-black"
                        placeholder="Enter your title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
                    <textarea
                        id="content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full text-black"
                        placeholder="Enter your content"
                        rows={4}
                        required
                    />
                </div>

                <div className='flex gap-4 justify-center'>
                    <button type="submit" className=" px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit</button>
                    <Link href='/' className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Kembali</Link> {/* Perbaiki posisi Link */}
                </div>
            </form>
        </div>
    )
}

export default Update;
