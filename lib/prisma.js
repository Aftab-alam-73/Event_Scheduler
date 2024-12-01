import { PrismaClient } from "@prisma/client";

export const db=globalThis.prisma || new PrismaClient()

if(process.env.NODE_ENV!=="production"){
    globalThis.prisma=db
}


//globalThis.prisma: This global variable ensures that prisma client is reused across hot reloads during development.Without this ,each time your application reloads ,a new instance of PrismaClient would be created,potentialy leading to connection issues.