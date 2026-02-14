import { getPosts } from "./actions/post"
import PostCard from "@/components/PostCard"

export const dynamic = "force-dynamic"

export default async function Home() {
  const posts = await getPosts()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Latest Stories</h1>
      {posts.length === 0 ? (
        <p className="text-gray-500">No stories yet. Be the first to write one!</p>
      ) : (
        posts.map((post: any) => (
          <PostCard key={post.id} post={post} />
        ))
      )}
    </div>
  )
}
