
import { NextRequest, NextResponse} from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"
import prisma from "@/lib/prismadb"

export async function GET(req:Request){

    const session = await getServerSession(authOptions);

    if(!session){
        return NextResponse.json({error:2},{status:400});
    }

    const user = await prisma.user.findUnique({
        where:{
            email:session.user?.email!
        }
    });

    if(!user){
        return NextResponse.redirect("/auth");
    }
    return NextResponse.json(user);
    
}