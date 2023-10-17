
import { NextResponse} from "next/server";
import prisma from "@/lib/prismadb"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { getServerSession } from "next-auth/next"

export async function GET(request:Request){
    const user =  await getServerSession(authOptions);
    if(!user){
        return NextResponse.json({},{status:400});
    }
    const movieCount = await prisma.movie.count();
    const randomIndex = Math.floor(Math.random()*movieCount);
    const randomMovies = await prisma.movie.findMany({take:1,skip:randomIndex});

    return NextResponse.json(randomMovies[0]);
}



