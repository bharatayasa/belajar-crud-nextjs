import React from "react";
import Link from "next/link";
import Item from "./item";

const getPost = async () => {
  const base_url = process.env.BASE_URL;

  const res = await fetch(`${base_url}/api/post`, {next: {revalidate: 0}})
  const json = await res.json();
  return json;
}

export default async function Home() {
  const posts = await getPost()

  return (
    <div className="w-[1000px] mx-auto pt-20">
      <Link href="/create" className="mt-10 px-5 py-3 bg-blue-500 rounded-lg hover:bg-blue-950">
        Create
      </Link>

      <div className="flex flex-col mt-4 gap-5">
        {posts?.posts?.map((post: any, index: number) => (
          <Item key={index} post={post}/>
        ))}
      </div>
    </div>
  );
}