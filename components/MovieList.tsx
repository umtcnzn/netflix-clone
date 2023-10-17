"use client"

import { Movie } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import MovieCard from "./MovieCard"


export default function MovieList({ title, movies }: { title: string, movies: Movie[] }) {

    if (!movies.length) {
        return null;
    }
    return <>
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div className="">
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-5 gap-2">
                    {movies?.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                    ))}
                </div>
            </div>
        </div>
    </>
}