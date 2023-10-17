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
    let updatedUser;
    
    const isFavorite = currentUser.favoriteIds.includes(movieId);
    if(isFavorite){
        const updatedFacoriteIds = without(currentUser.favoriteIds,movieId);
        updatedUser = await prisma.user.update({
            where:{
                email:currentUser.email!
            },
            data:{
                favoriteIds:updatedFacoriteIds
            }    
        })
    }
    else{
    updatedUser = await prisma.user.update({
        where:{
            email:currentUser.email!
        },
        data:{
            favoriteIds:{
                push:movieId,
            }
        }})
    }

    return new Response(JSON.stringify(updatedUser));
}