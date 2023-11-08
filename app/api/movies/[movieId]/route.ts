import prisma from "@/lib/prismadb"
import getUser from "@/lib/getUser";

export async function GET(request:Request, {params}:{params:{movieId:string}}){
    
    const movieId = params.movieId;

    if(typeof movieId != "string" || !movieId){
        return new Response("Invalid ID",{status:400})
    }
    const movie = await prisma.movie.findUnique({
        where:{
            id:movieId
        }
    });
    if(!movie){
        return new Response("Invalid ID",{status:400}); 
    }
    return new Response(JSON.stringify(movie));
}