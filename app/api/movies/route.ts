
import {NextResponse} from "next/server"
import prisma from "@/lib/prismadb"
import getUser from "@/lib/getUser";



export async function GET(request:Request){
    const user =  await getUser();
    if(!user){
        return NextResponse.json({},{status:400});
    }
    const movies = await prisma.movie.findMany();
    return NextResponse.json(movies);
}