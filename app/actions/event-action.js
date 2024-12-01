"use server"

import { auth } from "@clerk/nextjs/server"
import { eventSchema } from "../lib/validator"
import { db } from "@/lib/prisma"
import {
    startOfDay,
    addDays,
    format,
    parseISO,
    isBefore,
    addMinutes,
  } from "date-fns";
  

 

export const createEvent=  async (data)=>{
const {userId}=auth()
if(!userId){
    throw new Error("Unauthorized")
}

const validatedData=eventSchema.parse(data)

const user= await db.user.findUnique({
    where:{
        clerkUserId:userId
    }
})

if(!user){
    throw new Error("User not found")
}

const event=await db.event.create({
    data:{
     ...validatedData,
     userId:user.id
    }
})

return event

}


export const getUserEvents=async()=>{
 const {userId}=auth()
 if(!userId){
    throw new Error("Unauthorized")
 }

 const user=await db.user.findUnique({
    where:{
        clerkUserId:userId
    }
 })
if(!user){
    throw new Error("User not found")
}

const events=await db.event.findMany({
    where:{
        userId:user.id
    },
    orderBy:{createdAt:"desc"},
    include:{
        _count:{
            select:{booking:true}
        }
    }
})
return {events,username:user.username}
}


export const deleteEvent=async(eventId)=>{
    const {userId}=auth()
    if(!userId){
        throw new Error("Unauthorized")
    }

    const user=await db.user.findUnique({
        where:{
            clerkUserId:userId
        }
    })

    if(!user){
        throw new Error("User not found")
    }

    const event =await db.event.findUnique({
        where:{
            id:eventId
        }
    })
if(!event || userId!==user.id){
    throw new Error("Event is not found or Unauthrized")
}

    await db.event.delete({
        where:{
            id:eventId
        }
    })
return {
    success:true
}
}

export async function getEventDetails(username, eventId) {
    const event = await db.event.findFirst({
      where: {
        id: eventId,
        user: {
          username: username,
        },
      },
      include: {
        user: {
          select: {
            name: true,
            email: true,
            imageUrl: true,
          },
        },
      },
    });
  
    return event;
  }

  