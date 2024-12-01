import { clerkClient, currentUser} from "@clerk/nextjs/server"
import { db } from "./prisma"

export const checkUser = async () => {
    //step-1 fetch user from @clerk/nextjs/server

    const user = await currentUser()
    if (!user) {
        return null
    }

    //step:2 checkUser existing in db
    try {
        const loggedInUser = await db?.user.findUnique({
            where: {
                clerkUserId: user.id
            }
        })
        //if user is loggedIn simply return it
        if (loggedInUser) {
            return loggedInUser
        }
        // or else create a user in db
        //get name from user objec

        const name = `${user.firstName} ${user.lastName}`
        //import clerkClient from @clerk/nextjs/server
        //when the user is created very first time we will assign dummy name to the user and stored it into clerk and db as well.

        //updated name in clerk
        await clerkClient().users.updateUser(user.id, {
            username: name.split(" ").join("-") + user.id.slice(-4)
        })


        const newUser = await db.user.create({
            data: {
                clerkUserId: user.id,//user from clerk
                name,
                imageUrl: user.imageUrl,
                email: user.emailAddresses[0].emailAddress,
                username: name.split(" ").join("-") + user.id.slice(-4)

            }
        })
       
        return newUser
    } 
    catch (error) {
        console.error(error)
    }
}