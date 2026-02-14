"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

export async function createPost(title: string, content: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Unauthorized")
  if (process.env.ALLOWED_EMAIL && session.user.email !== process.env.ALLOWED_EMAIL) throw new Error("Forbidden")

  const user = await prisma.user.findUnique({
    where: { email: session.user.email }
  })

  if (!user) throw new Error("User not found")

  const post = await prisma.post.create({
    data: {
      title,
      content,
      authorId: user.id,
      published: true,
    }
  })

  revalidatePath("/")
  return post
}

export async function getPosts() {
  return await prisma.post.findMany({
    where: { published: true },
    include: { author: true },
    orderBy: { createdAt: 'desc' }
  })
}

export async function getPost(id: string) {
  return await prisma.post.findUnique({
    where: { id },
    include: { author: true }
  })
}
