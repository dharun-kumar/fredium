"use client"

import { signIn } from "next-auth/react"

export default function SignInPage() {
  return (
    <div className="max-w-md mx-auto mt-20 p-8 border rounded-lg bg-white shadow-sm text-center">
      <h1 className="text-2xl font-bold mb-6">Sign in to Fredium</h1>
      <p className="text-gray-600 mb-8">Sign in with your Google account to start writing and manage your profile.</p>
      <button
        onClick={() => signIn("google", { callbackUrl: "/" })}
        className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-50 transition"
      >
        <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="" />
        Sign in with Google
      </button>
    </div>
  )
}
