import { getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";

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
    <main className="min-h-screen max-w-3xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-6">{post.date}</p>

      <article
        className="prose prose-gray"
        dangerouslySetInnerHTML={{ __html: post.contentHtml }}
      />
    </main>
  );
}
