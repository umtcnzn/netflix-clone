import { User } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";


export default function FavoriteButton({ movieId }: { movieId: string }) {

    const route = useRouter();
    const queryClient = useQueryClient();
    const user = queryClient.getQueryData<User>(["user"]);
    const isFavorite = useMemo(() => {
        return user?.favoriteIds.includes(movieId);
    }, [user, movieId])
    const Icon = isFavorite ? AiOutlineCheck : AiOutlinePlus;


    const mutation = useMutation({
        mutationFn: () => {
            return axios.post("/api/updateFavs", { movieId })
        },
        onSuccess: () => { queryClient.invalidateQueries(); queryClient.refetchQueries() }
    })


    const toogleFav = useCallback(() => {
        mutation.mutate();
    }, [movieId, isFavorite, user, mutation])


    return <>
        <div onClick={() => toogleFav()} className="
    cursor-pointer
    group/item
    w-6
    h-6
    lg:w-10
    lg:h-10
    border-white
    border-2
    rounded-full
    flex
    justify-center
    items-center
    transition
    hover:border-neutral-300"
        >
            <Icon color={"white"} size={25} />
        </div>
    </>

}