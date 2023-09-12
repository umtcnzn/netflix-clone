"use client"

import Input from "@/components/input";
import React, { useState } from "react";

export default function Auth() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState<"login" | "sign-up">("login");

    return <React.Fragment>
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">

            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-6 lg:h-12" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {state == "login" ? "Sign In" : "Sign Up"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {state == "sign-up" && <Input id="name" value={name} label="Username" onChange={(e: any) => setName(e.target.value)} />}
                            <Input id="email" type="email" value={email} label="Email" onChange={(e: any) => setEmail(e.target.value)} />
                            <Input id="password" type="password" value={password} label="Password" onChange={(e: any) => setPassword(e.target.value)} />
                        </div>
                        <button className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {state == "login" ? "Sign In" : "Sign Up"}
                        </button>
                        <p className="text-zinc-400 mt-5">{state == "login" ? "New to Netflix? " : "Have Account? "} <span onClick={() => state == "login" ? setState("sign-up") : setState("login")} className="text-white hover:underline cursor-pointer">{state == "login" ? "Sign up now." : "Sign in now."}</span></p>
                    </div>
                </div>
            </div>




        </div>


    </React.Fragment>
}