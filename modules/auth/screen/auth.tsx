"use client"

import Image from "next/image"
import Text from "../components/Text"
import LoginForm from "../components/LoginForm"
import { useState } from "react";
import RegisterForm from "../components/RegisterForm";

export default function Auth() {
    const [type, setType] = useState<string>("login");

    return(
        <main className="h-dvh w-dwh flex justify-center items-center">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className="flex bg-black/76 h-3/4 w-4/5 px-16 justify-between items-center">
                <Text/>
                {type === "login" ? <LoginForm type={type} setType={setType}/> : <RegisterForm type={type} setType={setType}/>}
            </section>
        
        </main>
    )
}