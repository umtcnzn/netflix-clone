"use client"

import axios from "axios";
import Input from "@/components/input";
import React, { useCallback, useEffect, useState } from "react";
import { signIn } from "next-auth/react"
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export default function Auth() {


    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [state, setState] = useState<"login" | "sign-up">("login");

    useEffect(() => {
        resetValues();
    }, [state])

    function resetValues() {
        setName('');
        setEmail('');
        setPassword('');
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        const signInResponse = await signIn("credentials", {
            email: email,
            password: password,
            callbackUrl: "/profiles"
        });
        if (signInResponse && !signInResponse.error) {
            console.log("Sign in is okay")
        }
        else {
            console.log("Error:", signInResponse);
        }
    }

    const register = useCallback(async (e: any) => {
        try {
            const user = await axios.post("/api/register", {
                email,
                name,
                password
            })
            handleSubmit(e);
        } catch (error) {
            console.log(error);
        }
    }, [email, name, password]);


    return <React.Fragment>
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" alt="Logo" className="h-12 max-lg:h-6" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-80 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            {state == "login" ? "Sign In" : "Sign Up"}
                        </h2>

                        <div className="flex flex-col gap-4">

                            {state == "sign-up" &&
                                <Input id="name" value={name} label="Username" onChange={(e: any) => setName(e.target.value)} />}
                            <Input id="email" type="email" value={email} label="Email" onChange={(e: any) => setEmail(e.target.value)} />
                            <Input id="password" type="password"
                                value={password} label="Password" onChange={(e: any) => setPassword(e.target.value)} />
                        </div>
                        <button onClick={state == "login" ? handleSubmit : register} type="submit" className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                            {state == "login" ? "Sign In" : "Sign Up"}
                        </button>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => signIn("google", { callbackUrl: "/profiles" })} className="w-10 h-10
                             bg-white 
                             rounded-full 
                             flex 
                             items-center 
                             justify-center 
                             cursor-pointer 
                             hover:opacity-80 transition">
                                <FcGoogle size={30} />
                            </div>
                            <div onClick={() => signIn("github", { callbackUrl: "/profiles" })} className="w-10 h-10
                             bg-white 
                             rounded-full 
                             flex 
                             items-center 
                             justify-center 
                             cursor-pointer 
                             hover:opacity-80 transition">
                                <FaGithub size={30} />
                            </div>
                        </div>
                        <div className="text-zinc-400 mt-5">
                            {state == "login" ? "New to Netflix? " : "Have Account? "}
                            <span onClick={() => { state == "login" ? setState("sign-up") : setState("login") }}
                                className="text-white hover:underline cursor-pointer">
                                {state == "login" ? "Sign up now." : "Sign in now."}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </React.Fragment >
}