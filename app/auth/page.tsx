"use server"

import { authOptions } from "../api/auth/[...nextauth]/route";
import Auth from "./page.client"
import { getServerSession } from "next-auth"

import { redirect } from "next/navigation"




export default async function AuthServer() {
    const session = await getServerSession(authOptions);

    if (session) {
        redirect("/profiles");
    }
    return (
        <Auth />
    )
}