'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Page() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true)
        await fetch(`api/post`, {
            method: "POST",
            headers:{
                "Content-Type":"aplication/json" 
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

        setLoading(false)
        router.push('/');
    }

    return (
        <div className="w-[1000px] mx-auto pt-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tittle" className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        id="tittle"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 p-2 border rounded-md w-full text-black"
                        placeholder="Enter your title"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="content" className="block text-sm font-medium">Content</label>
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
                    <button disabled={loading} type="submit" className=" px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">{loading? "Loading": "Submit"}</button>
                    <button>
                        <Link href={'/'} className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Kembali</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Page;
