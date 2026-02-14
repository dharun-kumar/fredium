import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import ProfileForm from "@/components/ProfileForm"
import { getProfile } from "../actions/profile"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  const profile = await getProfile()

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
      <ProfileForm initialProfile={profile} />
    </div>
  )
}
