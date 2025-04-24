"use client";
import CircularProgress from '@mui/material/CircularProgress';
import ClientOnly from './clientOnly';
import { useEffect } from 'react';

export default function SuccessAuth() {
    useEffect(() => {
        const token = window.location.hash.split("=")[1];

        if (token){
            window.opener.postMessage({token}, process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-hazel.vercel.app/login" : "http://localhost:3000/login");
            window.close();
        }
    },[])
    
    return(
        <main className="w-full h-screen flex items-center justify-center bg-black/85">
            <ClientOnly>
                <CircularProgress/>
            </ClientOnly>
        </main>
    )
}