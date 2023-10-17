"use server"

import { redirect } from "next/navigation";
import getUser from "@/lib/getUser";
import ProfilesClient from "./page.client";

export default async function Profiles() {

    const session = await getUser();

    if (!session) {
        redirect("/auth");
    }

    return (
        <ProfilesClient user={session} />
    )
}