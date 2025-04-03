"use client"

import Image from "next/image"
import Text from "../components/Text"
import LoginForm from "../components/LoginForm"
import { useState, useEffect } from "react";
import RegisterForm from "../components/RegisterForm";
import "./auth.css"
import { getToken } from "../../../utils/localstorage";
import { useRouter } from "next/navigation";

export default function Auth() {
    const [type, setType] = useState<string>("login");
    const router = useRouter();

    useEffect(() => {
        const token = getToken();
        if (token !== null) {
            router.push("/dashboard");
        }
    },[])
    return(
        <main className="h-dvh w-dwh flex justify-center items-center overflow-x-hidden">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className="flex bg-black/76 h-[90%] w-4/5 px-16 justify-between items-center 
                                max-sm:w-[95%] max-sm:flex-col max-sm:overflow-y-auto max-lg:h-[90%]
                                fade-in overflow-x-hidden">
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
                
                {type === "login" ? <LoginForm setType={setType}/> : <RegisterForm setType={setType}/>}
            </section>
        
        </main>
    )
}