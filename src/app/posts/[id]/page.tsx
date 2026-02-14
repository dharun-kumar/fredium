import { getPost } from "../../actions/post"
import { format } from "date-fns"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    notFound()
  }

  return (
    <article className="max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">{post.title}</h1>

      <div className="flex items-center gap-3 mb-8 pb-8 border-b">
        {post.author.image && (
          <img src={post.author.image} alt="" className="w-12 h-12 rounded-full" />
        )}
        <div>
          <p className="font-medium text-gray-900">{post.author.name}</p>
          <p className="text-sm text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy")}</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none whitespace-pre-wrap text-gray-800 leading-relaxed">
        {post.content}
      </div>
    </article>
  )
}
