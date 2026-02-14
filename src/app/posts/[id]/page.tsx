import { getPost, deletePost } from "../../actions/post"
import { format } from "date-fns"
import { notFound, redirect } from "next/navigation"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Edit, Trash2 } from "lucide-react"

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)
  const session = await getServerSession(authOptions)

  if (!post) {
    notFound()
  }

  const isOwner = session?.user?.email === post.author.email

  return (
    <article className="max-w-2xl mx-auto">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-4xl font-bold text-gray-900 leading-tight">{post.title}</h1>
        {isOwner && (
          <div className="flex gap-2">
            <Link
              href={`/posts/${id}/edit`}
              className="p-2 text-gray-500 hover:text-blue-600 transition"
            >
              <Edit className="w-5 h-5" />
            </Link>
            <form action={async () => {
              "use server"
              await deletePost(id)
              redirect("/")
            }}>
              <button className="p-2 text-gray-500 hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </form>
          </div>
        )}
      </div>

      <div className="flex items-center gap-3 mb-8 pb-8 border-b">
        {post.author.image && (
          <img src={post.author.image} alt="Author" className="w-12 h-12 rounded-full border object-cover" />
        )}
        <div>
          <p className="font-medium text-gray-900">{post.author.name}</p>
          <p className="text-sm text-gray-500">{format(new Date(post.createdAt), "MMM d, yyyy")}</p>
        </div>
      </div>

      <div className="prose prose-lg max-w-none prose-slate prose-img:rounded-lg prose-img:border prose-a:text-blue-600">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            // eslint-disable-next-line @next/next/no-img-element
            img: ({ node: _node, ...props }: { node?: unknown } & React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt || "Post image"} className="mx-auto" style={{ maxWidth: '100%' }} />
          }}
        >
          {post.content}
        </ReactMarkdown>
      </div>
    </article>
  )
}
