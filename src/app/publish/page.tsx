import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import PublishForm from "@/components/PublishForm"

export default async function PublishPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/signin")
  }

  return (
    <div className="max-w-2xl mx-auto">
      <PublishForm />
    </div>
  )
}
