"use server"

import { db } from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"


export const updateUsername = async (username) => {
    // step:1 check user already Exist in clerk
    const { userId } = auth()
    if (!userId) {
        throw new Error("Unauthorized")
    }
    // step:2 check in db either
    const existingUsername = await db.user.findUnique({
        where:
            { username }
    })
    if (existingUsername && existingUsername.id !== userId) {
        throw new Error("Username already taken")
    }

    // Step:3 update user in db

    await db.user.update({
        where: {
            clerkUserId: userId
        },
        data: {
            username
        }
    })
//  step:4 update user in clerk either

await clerkClient.users.updateUser(userId,{
    username
})

return {
    success:true
}
}

export async function getUserByUsername(username) {
    const user = await db.user.findUnique({
      where: { username },
      select: {
        id: true,
        name: true,
        email: true,
        imageUrl: true,
        events: {
          where: {
            isPrivate: false,
          },
          orderBy: {
            createdAt: "desc",
          },
          select: {
            id: true,
            title: true,
            description: true,
            duration: true,
            isPrivate: true,
            _count: {
              select: { booking: true },
            },
          },
        },
      },
    });
  
    return user;
  }