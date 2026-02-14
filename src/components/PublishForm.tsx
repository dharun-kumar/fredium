"use client"

import { useState } from "react"
import { createPost } from "../app/actions/post"
import { useRouter } from "next/navigation"

export default function PublishForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await createPost(title, content)
      router.push("/")
    } catch (error) {
      console.error(error)
      alert("Failed to publish post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <input
        type="text"
        placeholder="Title"
        className="w-full text-4xl font-bold border-none outline-none placeholder:text-gray-300"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Tell your story..."
        className="w-full h-96 text-xl border-none outline-none resize-none placeholder:text-gray-300"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        required
      />
      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50 transition"
        >
          {loading ? "Publishing..." : "Publish"}
        </button>
      </div>
    </form>
  )
}
