import Link from "next/link"
import { format } from "date-fns"

interface PostCardProps {
  post: {
    id: string
    title: string
    content: string
    createdAt: Date
    author: {
      name: string | null
      image: string | null
    }
  }
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <div className="py-8 border-b last:border-0">
      <div className="flex items-center gap-2 mb-2">
        {post.author.image && (
          <img src={post.author.image} alt="" className="w-6 h-6 rounded-full" />
        )}
        <span className="text-sm font-medium text-gray-700">{post.author.name || "Anonymous"}</span>
        <span className="text-sm text-gray-500">·</span>
        <span className="text-sm text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy")}</span>
      </div>
      <Link href={`/posts/${post.id}`}>
        <h2 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition">
          {post.title}
        </h2>
        <p className="text-gray-600 line-clamp-3 mb-4">
          {post.content.substring(0, 200)}...
        </p>
      </Link>
    </div>
  )
}
