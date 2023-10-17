"use client"
import { User } from "@prisma/client";
import { Movie } from "@prisma/client";
import Navbar from "@/components/Navbar"
import {
  useQuery,
  useQueries
} from '@tanstack/react-query'
import axios from "axios";
import Billboard from "@/components/Billboard";
import MovieList from "@/components/MovieList";

export default function HomeClient() {

  const [user, movies, favMovies] = useQueries({
    queries: [
      {
        queryKey: ["user"],
        queryFn: (): Promise<User> => axios.get("/api/current").then((res) => res.data)
      },
      {
        queryKey: ["movies"],
        queryFn: (): Promise<Movie[]> => axios.get("/api/movies").then((res) => res.data),
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
      },
      {
        queryKey: ["favMovies"],
        queryFn: (): Promise<Movie[]> => axios.get("/api/favoriteMovies").then((res) => res.data),
      }
    ]
  })



  return (
    <>
      <Navbar />
      <Billboard />
      <div className="pb-40">
        {!movies.isLoading && <MovieList title="Trending Now" movies={movies.data!} />}
        {!favMovies.isLoading && <MovieList title="My List" movies={favMovies.data!} />}
      </div>
    </>

  )



}
