import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IPO Reviews & Risk Analysis | Simple IPO Blog",
  description:
    "Plain-English IPO reviews, risks, and DRHP summaries for Indian retail investors.",
};


export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        IPO Reviews & Risk Analysis
      </h1>

      <ul className="space-y-6">
        {posts.map((post) => (
          <li key={post.slug} className="border-b pb-4">
            <Link
              href={`/ipo/${post.slug}`}
              className="text-2xl font-semibold text-blue-600 hover:underline"
            >
              {post.title}
            </Link>

            <p className="text-gray-600 mt-2">
              {post.description}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              {post.date}
            </p>
          </li>
        ))}
      </ul>
    </main>
  );
}


