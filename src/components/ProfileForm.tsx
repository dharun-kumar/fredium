"use client"

import { useState } from "react"
import { updateProfile } from "../app/actions/profile"

interface ProfileFormProps {
  initialProfile: {
    name?: string | null
    about?: string | null
    image?: string | null
  } | null
}

export default function ProfileForm({ initialProfile }: ProfileFormProps) {
  const [name, setName] = useState(initialProfile?.name || "")
  const [about, setAbout] = useState(initialProfile?.about || "")
  const [image, setImage] = useState(initialProfile?.image || "")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile({ name, about, image })
      alert("Profile updated!")
    } catch (error) {
      console.error(error)
      alert("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture URL</label>
        <input
          type="text"
          className="w-full p-2 border rounded-md"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">About</label>
        <textarea
          className="w-full p-2 border rounded-md h-32"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="Tell us about yourself..."
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  )
}
