"use client"

import { useState, useRef, useEffect } from "react"
import { createPost, updatePost } from "../app/actions/post"
import { useRouter } from "next/navigation"
import { Image as ImageIcon, Loader2 } from "lucide-react"

interface PublishFormProps {
  initialData?: {
    id: string
    title: string
    content: string
  }
}

export default function PublishForm({ initialData }: PublishFormProps) {
  const [title, setTitle] = useState(initialData?.title || "")
  const [content, setContent] = useState(initialData?.content || "")
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleImageUpload = (file: File) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be smaller than 2MB")
      return
    }
    const reader = new FileReader()
    reader.onloadend = () => {
      const base64 = reader.result as string
      const imageMarkdown = `\n![image](${base64})\n`
      const textarea = textareaRef.current
      if (textarea) {
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const newContent = content.substring(0, start) + imageMarkdown + content.substring(end)
        setContent(newContent)
      } else {
        setContent(prev => prev + imageMarkdown)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) handleImageUpload(file)
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    const items = e.clipboardData.items
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const file = items[i].getAsFile()
        if (file) handleImageUpload(file)
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (initialData) {
        await updatePost(initialData.id, title, content)
        router.push(`/posts/${initialData.id}`)
      } else {
        await createPost(title, content)
        router.push("/")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to save post")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-between items-center sticky top-0 bg-white py-4 z-10 border-b">
        <input
          type="text"
          placeholder="Title"
          className="flex-1 text-3xl font-bold border-none outline-none placeholder:text-gray-300"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <div className="flex items-center gap-4">
          <label className="p-2 text-gray-500 hover:text-gray-900 cursor-pointer transition" title="Insert image">
            <ImageIcon className="w-6 h-6" />
            <input type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </label>
          <button
            type="submit"
            disabled={loading}
            className="bg-green-600 text-white px-6 py-2 rounded-full hover:bg-green-700 disabled:opacity-50 transition flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            {initialData ? "Update" : "Publish"}
          </button>
        </div>
      </div>

      <div className="relative">
        <textarea
          ref={textareaRef}
          placeholder="Tell your story... (Paste images directly here)"
          className="w-full h-[60vh] text-xl border-none outline-none resize-none placeholder:text-gray-300 font-serif leading-relaxed"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          onPaste={handlePaste}
          required
        />
      </div>
      <p className="text-sm text-gray-400">Tip: You can paste images directly into the editor.</p>
    </form>
  )
}
