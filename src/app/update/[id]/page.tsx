'use client'
import React, { useState } from 'react'
import Link from "next/link";
import { useRouter } from 'next/navigation';

function Update() {
    const [tittle, setTittle] = useState('')
    const [content, setContent] = useState('')

    const router = useRouter()

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(tittle, content);

        router.push('/');
    }

    return (
        <div className="w-[1000px] mx-auto pt-20">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="tittle" className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                        type="text"
                        id="tittle"
                        value={tittle}
                        onChange={(e) => setTittle(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
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
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                        placeholder="Enter your content"
                        rows={4}
                        required
                    />
                </div>

                <div className='flex gap-4 justify-center'>
                    <button type="submit" className=" px-5 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">Submit</button>
                    <button>
                        <Link href={'/'} className="px-5 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Kembali</Link>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Update;
