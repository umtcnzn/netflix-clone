import prisma from "@/lib/prismadb"
import getUser from "@/lib/getUser";



export async function GET(request:Request){
    const currentUser = await getUser();
    if(!currentUser){
        return new Response("Not logged in",{status:400})
    }

    const favoriteMovies = await prisma.movie.findMany({
        where:{
            id:{
                in:currentUser.favoriteIds,
            }
        },
    })

    return new Response(JSON.stringify(favoriteMovies));
}


