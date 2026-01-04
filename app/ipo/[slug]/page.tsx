import { getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";

import { getAllPosts } from "@/lib/posts";

export async function generateStaticParams() {
  const posts = getAllPosts();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "IPO Not Found",
    };
  }

  return {
    title: post.title,
    description: post.description,
  };
}

export default async function IpoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return (
      <main className="min-h-screen p-8">
        <h1 className="text-2xl font-bold">IPO not found</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen max-w-3xl mx-auto p-6">
      <div className="bg-white dark:bg-zinc-900 rounded-lg shadow-sm p-6">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-500 mb-6">{post.date}</p>

        <article
          className="
            prose 
            prose-lg 
            prose-gray
            dark:prose-invert 
            max-w-none
            prose-h2:border-b 
            prose-h2:pb-2 
            prose-h2:mt-10
            prose-table:w-full
            prose-table:border
            prose-table:border-gray-700
            prose-th:border
            prose-td:border
            prose-th:px-3
            prose-td:px-3
            prose-th:py-2
            prose-td:py-2
          "
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </div>

    </main>
  );
}
