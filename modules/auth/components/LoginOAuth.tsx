"use client";
import { saveToken } from "@/utils/localstorage";
import Image from "next/image"
import { useEffect } from "react";

export default function LoginOAuth() {
    const handleClick = () => {
        window.open(`${process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/"}api/v1/oauth2/authorization/google`, "_blank", "width=500,height=600");
    }
    useEffect(() => {
        function handleMessage(event: MessageEvent) {
            const { token } = event.data;
    
            if (token) {
                saveToken(token);
    
                window.location.href = "/dashboard"; 
            }
        }
    
        window.addEventListener("message", handleMessage);
    
        return () => {
            window.removeEventListener("message", handleMessage);
        };
    },[])

    return(
        <button
        onClick={handleClick} 
        className="flex mt-9 items-center justify-center bg-black/45 py-3 px-4
                    rounded-4xl cursor-pointer hover:bg-black/70 transition-all duration-200"
        >
            <span
            className="tracking-widest font-semibold text-white/90 text-sm"
            >
            Login with Google    
            </span>
            <Image 
            src="/google.svg" 
            alt="Google" 
            width={20} 
            height={20} 
            className="ml-2" 
            />
        </button>
    )
}