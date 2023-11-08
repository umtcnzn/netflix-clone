"use server"
import getUser from "@/lib/getUser";
import WatchClient from "./page.client";
import { redirect } from "next/navigation";
import axios from "axios";


export default async function Watch({ params }: { params: { movieId: string } }) {

    const user = await getUser();
    if (!user) {
        redirect("/auth");
    }
    const movie = await axios.get(`http://localhost:3000/api/movies/${params.movieId}`).then(res => res.data)

    return <>
        <WatchClient movie={movie} />
    </>

}