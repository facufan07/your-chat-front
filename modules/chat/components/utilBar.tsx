"use client"

import { message } from "@/interfaces/interfaces"
import Image from "next/image"
import { useState } from "react"
import { CreateMessage } from "../services/createMessage"
import LinearProgress from '@mui/material/LinearProgress';

interface UtilBarProps{
    chatId: number
    messages: message[]
    setMessages: Function
}

export default function UtilBar({chatId, messages, setMessages}:UtilBarProps) {

    const [type, setType] = useState<boolean>(true);
    const [message, setMessage] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [isSending, setIsSending] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        setIsSending(true);
        e.preventDefault();
        if(message === "") return;
        setLoading(true);
        const response = await CreateMessage(chatId, message, type);
        if(response !== false){
            setMessage("");
            setMessages([...messages, response]);
        }
        setLoading(false);
        setIsSending(false);
    }

    return(
    <>
    
    <div className="flex items-center py-5 px-4">
        <button 
        className={`rounded-full  transition-all duration-200
                    cursor-pointer p-2
                    ${type ? "bg-[#484848]/86" : "bg-black/76"}`}
        title="Change mode"
        onClick={() => setType(!type)}
        >
            <Image 
            src="/change.png" 
            alt="Change" 
            width={40}
            height={35}
            className="hover:scale-90 transition-all duration-200"
            />
        </button>
        <form onSubmit={handleSubmit} className="flex items-center gap-4 py-5 pl-4">
            
            <input
            className="bg-black/74 rounded-lg shadow-lg px-5 w-full text-white tracking-widest
                        outline-none py-2" 
            type="text" 
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            />
            <button
            className="rounded-full bg-[#484848]/86 p-2 hover:bg-black/76 transition-all duration-200 
                        cursor-pointer"
            title="Send message"
            type="submit"
            disabled={isSending}
            >
                <Image 
                src="/plane.png" 
                alt="Send message" 
                width={40}
                height={35}
                className="hover:scale-90 transition-all duration-200"
                />
            </button>
        </form>
        
    </div>
    {loading &&(
            <div className="w-full">
                <LinearProgress />
            </div>
        )}
    </>
    )
}