import prisma from "@/lib/prismadb"
import getUser from "@/lib/getUser";

import {without} from "lodash"


export async function POST(request:Request){
    const currentUser = await getUser();

    if(!currentUser)
        return new Response("Not logged in",{status:400});
    const {movieId} = await request.json();

    const existingMovie = await prisma.movie.findUnique({
        where:{id : movieId},
    });

    if (!existingMovie) 
        return new Response("No such Movie exists",{status: 400});
      
    const updatedUser = await prisma.user.update({
        where:{
            email:currentUser.email!
        },
        data:{
            favoriteIds:{
                push:movieId,
            }
        }})



    return new Response(JSON.stringify(updatedUser));
}

export async function DELETE(request:Request){
    const currentUser = await getUser();

    if(!currentUser)
        return new Response("Not logged in",{status:400});
    const {movieId} = await request.json();

    const existingMovie = await prisma.movie.findUnique({
        where:{id : movieId},
    });

    if (!existingMovie) 
        return new Response("No such Movie exists",{status: 400});
      
    const newFavoriteIds = without(currentUser.favoriteIds,movieId)

    const updatedUser = await prisma.user.update({
        where:{
            email:currentUser.email!
    },
    data:{
        favoriteIds:{set:newFavoriteIds}
    }
}
    )

        

    return new Response(JSON.stringify(updatedUser));
}