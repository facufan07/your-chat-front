"use client"

import { message } from "@/interfaces/interfaces";
import Image from "next/image";
import { useEffect, useRef, useState } from "react"
import { getMessages } from "../services/getMessages";
import "./chat.css"
import { getLastPage } from "../../../utils/getLastPage";

interface MessagesProps {
    chatId: number
    setMessages: Function
    messages: message[]
}

export default function Messages({chatId, setMessages , messages}: MessagesProps){

    const chatRef = useRef<HTMLDivElement>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [notScroll, setNotScroll] = useState<boolean>(false);

    useEffect(() => {
        
        const handleMessages = async () => {
            try{
                const pages = await getLastPage(chatId, "message");

                const data = await getMessages(chatId, pages);
                setMessages(data);
                setCurrentPage(pages - 1)
            }
            catch{
                setMessages([]);
            }
        }
        
        handleMessages();
        
    },[])

    useEffect(() => {
        if(notScroll === false){
            if (chatRef.current) {
                chatRef.current.scrollTop = chatRef.current.scrollHeight;
            }
        }else{
            setNotScroll(false);
        }
    }, [messages]);

    const loadMoreMessages = async () => {
        if(currentPage > 0 && chatRef.current){
            const previousScrollHeight = chatRef.current.scrollHeight;

            const data = await getMessages(chatId, currentPage);
            setMessages((prevMessages: message[]) => [...data, ...prevMessages]);
            
            setTimeout(()=>{
                if(chatRef.current){
                    chatRef.current.scrollTop += chatRef.current.scrollHeight - previousScrollHeight;
                }
            }, 10)
            
            
            setCurrentPage(currentPage - 1);
        }
    }

    return(
    <div className="w-full h-full px-5 py-5 flex flex-col gap-5 overflow-y-auto scroll" ref={chatRef}>
        {currentPage !== 0 && currentPage !== -1 &&  (
            <div className="w-full flex justify-center">
                <button
                className="rounded-full bg-[#484848]/86 p-2 hover:bg-black/76 transition-all duration-200 
                            cursor-pointer"
                title="Load more messages"
                onClick={() => {setNotScroll(true); loadMoreMessages()}}
                >
                    <Image 
                    src="/upArrow.png" 
                    alt="Change" 
                    width={40}
                    height={35}
                    className="hover:scale-90 transition-all duration-200"
                    />
                </button>
            </div>
            
        ) }
        {messages.map((message, key) => (
            message.type === true ? (
                <div className="flex justify-end w-full" key={key}>
                    <div className="bg-[#484848]/76 px-5 py-3 rounded-2xl max-w-[70%] h-auto">
                        <p className="text-white tracking-widest break-words">{message.text}</p>
                    </div>
                </div>
            ) : (
                <div className="flex justify-start w-full" key={key}>
                    <div className="bg-black/76 px-5 py-3 rounded-2xl max-w-[70%] h-auto">
                        <p className="text-white tracking-widest break-words">{message.text}</p>
                    </div>
                </div>
            )
        ))}
    </div>
)
}