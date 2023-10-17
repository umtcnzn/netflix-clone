

import NextAuth from "next-auth/next";

import { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";

import prisma from "@/lib/prismadb"

import {compare} from "bcrypt"


export const authOptions : NextAuthOptions ={
    adapter:PrismaAdapter(prisma),
    pages:{
        signIn:"/auth"
    },
    session:{
        strategy: 'jwt',
    },
    secret:process.env.NEXTAUTH_SECRET,
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:"Sign in",
            credentials:{
                email:{
                    label:'Email',
                    type:"email"
                },
                password:{
                    label:'Password' ,
                    type:"password"
                }
            },
            async authorize(credentials) {
                if(!credentials?.email || !credentials?.password){
                    throw new Error("Email or Password doesn't exist")
                }

                const user = await prisma.user.findUnique({
                    where:{
                        email:credentials.email
                    }
                })
                if(!user){
                    throw new Error("User not found")
                }

                const isCorrectPassword = await compare(credentials.password,user.hashedPassword!);

                if(isCorrectPassword){
                    return user;
                }
                throw new Error("Password doesn't match");
                
            },

        })
    ],

}

const handler = NextAuth(authOptions);


export {handler as GET, handler as POST};