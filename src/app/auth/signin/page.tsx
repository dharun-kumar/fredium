"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")
    const res = await signIn("email", { email, redirect: false })
    if (res?.ok) {
      setStatus("success")
    } else {
      setStatus("error")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg bg-white shadow-sm">
      <h1 className="text-2xl font-bold mb-6 text-center">Sign in to Fredium</h1>
      {status === "success" ? (
        <div className="text-center text-green-600">
          <p className="font-medium">Check your email!</p>
          <p className="text-sm mt-2">A magic link has been sent to your inbox.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full p-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            {status === "loading" ? "Sending link..." : "Send Magic Link"}
          </button>
          {status === "error" && (
            <p className="text-red-500 text-sm text-center">Something went wrong. Please try again.</p>
          )}
        </form>
      )}
    </div>
  )
}
