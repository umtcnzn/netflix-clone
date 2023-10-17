"use server"

import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prismadb"



export default async function getUser(){
    const session = await getServerSession(authOptions);
    if(session){
        const user = await prisma.user.findUnique({
            where:{
                email:session.user?.email!,
            }
        })
        if(user){
            return user;
        }
        else{
            return null;
        }
    }
    return null;
}