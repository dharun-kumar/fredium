"use client"

import { useState, useEffect } from "react"
import { getProfile, updateProfile } from "../actions/profile"
import { useSession } from "next-auth/react"

export default function ProfilePage() {
  const { data: session } = useSession()
  const [name, setName] = useState("")
  const [about, setAbout] = useState("")
  const [image, setImage] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function loadProfile() {
      const profile = await getProfile()
      if (profile) {
        setName(profile.name || "")
        setAbout(profile.about || "")
        setImage(profile.image || "")
      }
    }
    if (session) loadProfile()
  }, [session])

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

  if (!session) return <p>Please sign in to view your profile.</p>

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
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
    </div>
  )
}
