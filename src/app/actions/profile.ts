"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function updateProfile(data: { name?: string, about?: string, image?: string }) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Unauthorized")

  const updatedUser = await prisma.user.update({
    where: { email: session.user.email },
    data
  })

  revalidatePath("/profile")
  return updatedUser
}

export async function getProfile() {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Unauthorized")

  return await prisma.user.findUnique({
    where: { email: session.user.email }
  })
}
