import { Movie } from "@prisma/client"
import { BsFillPlayFill } from "react-icons/bs"
import FavoriteButton from "./FavoriteButton"

import { useRouter } from "next/navigation"
import { useRef, useState } from "react";




export default function MovieCard({ movie }: { movie: Movie }) {

    const router = useRouter();

    const [showVideo, setShowVideo] = useState(false);

    return <>
        <div onMouseEnter={() => setShowVideo(true)} onMouseLeave={() => setShowVideo(false)} className="group bg-zinc-900 col-span relative h-[10vw]">

            <img className="cursor-pointer
            object-cover
            transition
            duration
            shadow-xl
            rounded-md 
            group-hover:opacity-90
            sm:group-hover:opacity-0
            delay-100
            w-full
            h-[10vw]"
                src={movie.thumbnailUrl} alt="Thumbnail" />
            <div className={`opacity-0
                absolute
                top-0
                transition
                duration-200
                z-10
                invisible
                sm:visible
                delay-100
                w-full
                scale-0
                group-hover:scale-110
                group-hover:-translate-y-[3vw]
                group-hover:translate-x-[1vw]
                group-hover:opacity-100`
            }>
                {showVideo ? <video autoPlay loop muted className="
                    cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[10vw]" src={movie.videoUrl}></video> : <img src={movie.thumbnailUrl} className="cursor-pointer
                    object-cover
                    transition
                    duration
                    shadow-xl
                    rounded-t-md
                    w-full
                    h-[10vw]"/>}
                <div className="z-10
                    bg-zinc-800
                    p-2
                    lg:p-4
                    absolute
                    w-full
                    transition
                    shadow-md
                    rounded-b-md">
                    <div className="flex flex-row items-center gap-3">
                        <button onClick={() => router.push(`/watch/${movie.id}`)} className="w-6 h-6
                        lg:w-10 lg:h-10
                        bg-white
                        rounded-full
                        flex
                        justify-center
                        items-center
                        transition
                        hover:bg-neutral-300">
                            <BsFillPlayFill className={"ml-0.5"} size={30} />
                        </button>
                        <FavoriteButton movieId={movie.id} />
                    </div>
                    <div className="flex flex-row mt-2 items-center gap-2">
                        <p className="text-green-400 font-medium">
                            %97 Matched
                        </p>
                        <p className="text-gray-400">{movie.duration.substring(0, 6)}s.</p>
                    </div>
                    <div className="flex flex-row mt-2 items-center gap-2 text-white">
                        <p>{movie.genre}</p>
                    </div>
                </div>
            </div>

        </div>
    </>
}