import bcrypt from "bcrypt"
import {NextRequest, NextResponse} from "next/server"
import prisma from "@/lib/prismadb"
export async function POST(request:Request){
    const body = await request.json();

    if(request.method !== "POST"){
        throw new Error("Invalid Method")
    }

    const {
        email,
        name,
        password
    } = body;

    const existingUser = await prisma.user.findUnique({
        where:{
            email:email
        }
    })
    if(existingUser){
        throw new Error("This Email is Already Taken")
    }

    const hashedPassword = await bcrypt.hash(password,12)

    const user = await prisma.user.create({
        data:{
            email,
            name,
            hashedPassword,
            image:"",
            emailVerified: new Date(),
        }
    });
    return NextResponse.json(user);
}