"use client"

import { Movie } from "@prisma/client"
import { useEffect, useState } from "react"
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/navigation";


export default function WatchClient({ movie }: { movie: Movie }) {

    const router = useRouter();



    return <>
        {movie && <div className="h-screen w-screen bg-black">
            <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-4 bg-black/70">
                <AiOutlineArrowLeft onClick={() => router.push("/")} size={30} className={"text-white cursor-pointer hover:text-white/60 transition"} />
                <p className="text-white text-1xl md:text-3xl font-bold">
                    <span className="font-light mr-1.5">
                        Watching:
                    </span>
                    {movie?.title}
                </p>
            </nav>
            <video autoPlay controls src={movie?.videoUrl} className="h-full w-full">

            </video>
        </div>}

    </>
}