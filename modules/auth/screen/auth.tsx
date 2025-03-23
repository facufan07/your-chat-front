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

            <section className="flex bg-black/76 h-[90%] w-4/5 px-16 justify-between items-center 
                                max-sm:w-[95%] max-sm:flex-col max-sm:overflow-y-auto max-lg:h-[90%]
                                ">
                <div className="flex flex-col sm:mb-24">
                    <Image 
                    src="/logoyourchatt.png" 
                    alt="background" 
                    width={200}
                    height={100}
                    className="max-sm:mx-auto my-8"
                    />
                    <Text/>
                </div>
                
                {type === "login" ? <LoginForm type={type} setType={setType}/> : <RegisterForm type={type} setType={setType}/>}
            </section>
        
        </main>
    )
}