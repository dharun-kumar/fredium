import { getPost } from "../../../actions/post"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { notFound, redirect } from "next/navigation"
import PublishForm from "@/components/PublishForm"

export default async function EditPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const session = await getServerSession(authOptions)
  if (!session) redirect("/auth/signin")

  const post = await getPost(id)
  if (!post) notFound()

  if (session.user.email !== post.author.email) {
    redirect(`/posts/${id}`)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PublishForm initialData={{
        id: post.id,
        title: post.title,
        content: post.content
      }} />
    </div>
  )
}
