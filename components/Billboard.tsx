import React from "react";
import {
    useQuery
} from '@tanstack/react-query'
import { Movie } from "@prisma/client";
import axios from "axios";
import { AiOutlineInfoCircle } from "react-icons/ai"

const Billboard = () => {

    const { data: randomMovie, isLoading } = useQuery({
        queryKey: ["randomMovie"],
        queryFn: (): Promise<Movie> => axios.get("/api/random").then((res) => res.data),
        refetchOnReconnect: false,
        refetchOnMount: false,
        refetchOnWindowFocus: false
    })

    return <>
        {!isLoading && (
            <div className="relative h-[42vw]">
                <video className="
            w-full h-[42vw] object-cover brightness-[60%]" autoPlay muted loop
                    src={randomMovie?.videoUrl} poster={randomMovie?.thumbnailUrl}>
                </video>
                <div className="absolute top-[30%] md:top-[31%] lg:top-[40%] ml-4 md:ml-16">
                    <p className="text-white text-xl md:text-4xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
                        {randomMovie?.title}
                    </p>
                    <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%] lg:w-[50%] drop-shadow-xl">
                        {randomMovie?.description}
                    </p>
                    <div className="items-center mt-3 md:mt-4 gap-3">
                        <button className="
                    flex flex-row
                    bg-white
                    text-white
                    bg-opacity-30
                    rounded-md
                    py-1 md:py-2
                    px-2 md:px-4
                    w-auto
                    text-xs lg:text-lg
                    font-semibold
                    items-center
                    hover:bg-opacity-20
                    transition">
                            <AiOutlineInfoCircle size={25} className={"mr-1"} />
                            More Info
                        </button>
                    </div>
                </div>
            </div>)}
    </>
}

export default Billboard;