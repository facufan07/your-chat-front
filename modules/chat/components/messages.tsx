"use client"

import { message } from "@/interfaces/interfaces";
import { useEffect, useRef } from "react"
import { getMessages } from "../services/getMessages";
import "./chat.css"

interface MessagesProps {
    chatId: number
    setMessages: Function
    messages: message[]
}

export default function Messages({chatId, setMessages , messages}: MessagesProps){

    const chatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMessages = async () => {
            try{
                const data = await getMessages(chatId);
                setMessages(data);
            }
            catch{
                setMessages([]);
            }
        }

        handleMessages();
    },[])

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [messages]);

    return(
    <div className="w-full h-full px-5 py-5 flex flex-col gap-5 overflow-y-auto scroll" ref={chatRef}>
        {messages.map((message, key) => (
            message.type === true ? (
                <div className="flex justify-end w-full" key={key}>
                    <div className="bg-[#484848]/76 px-5 py-3 rounded-2xl">
                        <p className="text-white tracking-widest">{message.text}</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start w-full" key={key}>
                    <div className="bg-black/76 px-5 py-3 rounded-2xl">
                        <p className="text-white tracking-widest">{message.text}</p>
                    </div>
                </div>
            )
        ))}
    </div>
)
}