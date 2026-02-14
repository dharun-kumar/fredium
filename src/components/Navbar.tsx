"use client"

import Link from "next/link"
import { useSession, signIn, signOut } from "next-auth/react"
import { BookOpen, User, LogOut, PlusSquare } from "lucide-react"

export default function Navbar() {
  const { data: session } = useSession()

  return (
    <nav className="border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-gray-900 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-blue-600" />
          <span>Fredium</span>
        </Link>

        <div className="flex items-center gap-6">
          {session ? (
            <>
              <Link href="/publish" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <PlusSquare className="w-5 h-5" />
                <span>Write</span>
              </Link>
              <Link href="/profile" className="text-gray-600 hover:text-gray-900 flex items-center gap-1">
                <User className="w-5 h-5" />
                <span>Profile</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="text-gray-600 hover:text-gray-900 flex items-center gap-1"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
              {session.user?.image && (
                <img
                  src={session.user.image}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full border"
                />
              )}
            </>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
