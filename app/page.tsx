"use server"

import { redirect } from "next/navigation";
import HomeClient from "./page.client";
import getUser from "@/lib/getUser";
import { headers } from "next/headers"

export default async function Home() {

    const session = await getUser();
    if (!session) {
        redirect("/auth");
    }
    const movies = await fetch("http://localhost:3000/api/movies", { headers: headers(), method: "GET" }).then((res) => res.json())
    const favoriteMovies = await fetch("http://localhost:3000/api/favoriteMovies", { headers: headers(), method: "GET" }).then((res) => res.json())
    return (
        <HomeClient />
    )
}
