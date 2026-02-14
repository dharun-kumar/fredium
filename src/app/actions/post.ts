"use server"

import { prisma } from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { revalidatePath } from "next/cache"

async function checkOwnership(postId: string) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) return null

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { author: { select: { email: true } } }
  })

  if (!post || post.author.email !== session.user.email) return null
  return session.user.email
}

export async function createPost(formData: FormData) {
  const session = await getServerSession(authOptions)
  if (!session?.user?.email) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (!title || !content) throw new Error("Title and content are required")

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

export async function updatePost(id: string, formData: FormData) {
  const email = await checkOwnership(id)
  if (!email) throw new Error("Unauthorized")

  const title = formData.get("title") as string
  const content = formData.get("content") as string

  if (!title || !content) throw new Error("Title and content are required")

  const post = await prisma.post.update({
    where: { id },
    data: { title, content }
  })

  revalidatePath("/")
  revalidatePath(`/posts/${id}`)
  return post
}

export async function deletePost(id: string) {
  const email = await checkOwnership(id)
  if (!email) throw new Error("Unauthorized")

  await prisma.post.delete({
    where: { id }
  })

  revalidatePath("/")
  return { success: true }
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
