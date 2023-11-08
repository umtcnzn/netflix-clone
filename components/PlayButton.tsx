import { BsFillPlayFill } from "react-icons/bs"

import { useRouter } from "next/navigation"



export default function PlayButton({ movieId }: { movieId: string }) {
    const router = useRouter();
    return <>
        <button onClick={() => router.push(`/watch/${movieId}`)} className="bg-white
        rounded-md
        py-1 md:py-2
        px-2 md:px-4
        w-auto
        text-xs lg:text-xl
        font-semibold
        flex
        flex-row
        gap-1
        items-center
        hover:bg-neutral-300
        transition">
            <BsFillPlayFill size={25} />
            Play
        </button>
    </>
}