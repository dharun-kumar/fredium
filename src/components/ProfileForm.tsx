"use client"

import { useState } from "react"
import { updateProfile } from "../app/actions/profile"
import { Camera } from "lucide-react"

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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 1024 * 1024) {
        alert("Image must be smaller than 1MB")
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
      <div className="flex flex-col items-center gap-4">
        <div className="relative group w-32 h-32">
          {image ? (
            <img src={image} alt="Profile" className="w-full h-full rounded-full object-cover border" />
          ) : (
            <div className="w-full h-full rounded-full bg-gray-100 flex items-center justify-center border">
              <Camera className="w-8 h-8 text-gray-400" />
            </div>
          )}
          <label className="absolute inset-0 flex items-center justify-center bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition cursor-pointer">
            <span className="text-sm font-medium">Change</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <p className="text-xs text-gray-500">Max size 1MB. Local upload supported.</p>
      </div>

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
        className="w-full bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save Profile"}
      </button>
    </form>
  )
}
