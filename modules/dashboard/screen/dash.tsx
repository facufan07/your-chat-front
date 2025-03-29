"use client"

import Image from 'next/image'
import Browser from '../components/browser'
import ChatContainer from '../components/chatContainer'
import NewChatButton from '../components/newChatButton'
import { useEffect, useRef, useState } from 'react'
import { getChats } from '../services/getChats'
import { chat } from "@/interfaces/interfaces";

import "./dash.css"
import CreateChatForm from '../components/createChatForm'
import Alert from '@/utils/alert'
import { getLastPage } from '@/utils/getLastPage'

export default function Dash() {
    
    const [chats, setChats] = useState<chat[]>([]);
    const [chatModal, setChatModal] = useState<boolean>(false);
    const [error , setError] = useState<string>("");

    const chatsRef = useRef<HTMLDivElement>(null);
    const [maxPage, setMaxPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);

    useEffect(() => {
        if(chatModal){
            setChatModal(false);
        }

        const handleChat = async () => {
            try{
                const pages = await getLastPage(-1, "chat");
                const data = await getChats(currentPage);
                setChats(data);

                setMaxPage(pages - 1);
                
            }
            catch{
                setChats([]);
            }
        }
        
        handleChat();
        return;
    },[])

    const loadMoreMessages = async (newPage: number) => {
        if(newPage <= maxPage && chatsRef.current){
            const previousScrollHeight = chatsRef.current.scrollHeight;
            
            const data = await getChats(newPage);
            setChats((prevChats: chat[]) => [...prevChats, ...data ]);
            
            setTimeout(()=>{
                if(chatsRef.current){
                    chatsRef.current.scrollTop += chatsRef.current.scrollHeight - previousScrollHeight;
                }
            }, 0)
        }
    }

    const reloadChats = async () => {
        try {
            const pages = await getLastPage(-1, "chat");
            setMaxPage(pages - 1);
        
            setCurrentPage(0);
        
            const data = await getChats(0);
            setChats(data);
        } catch (error) {
            setChats([]);
        }
    }

    useEffect(() => {
        if (currentPage > 0) {
            loadMoreMessages(currentPage);
        }
    }, [currentPage]);

    return(
        <main className="h-dvh w-dvw flex justify-center items-center overflow-x-hidden">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className='bg-black/76 w-[35%] h-[75%] max-sm:w-[95%] flex flex-col items-center relative 
                                max-lg:w-[90%] fade-in'>
                <Image 
                src="/logoyourchatt.png" 
                alt="logo" 
                width={300}
                height={400}
                className="mt-10"
                />
                <Browser/>
                <div 
                className='flex flex-col items-center h-[250px] overflow-y-auto gap-8 scroll px-2 '
                ref={chatsRef}
                >
                    {chats.length === 0  ?(
                        <p className='text-white text-2xl tracking-widest font-semibold'>
                            Create your first chat!
                        </p>
                    ):(
                        <>
                        {chats.map((chat) => (
                            <ChatContainer 
                            key={chat.id} 
                            name={chat.name} 
                            creationDate={chat.creationDate} 
                            lastMessageDate={chat.lastMessageDate}
                            id={chat.id}
                            reloadChats={reloadChats}
                            />
                        ))}
                        
                        {currentPage < maxPage && (
                            <button
                            className='rounded-full bg-[#484848]/86 p-2 hover:bg-black/76 transition-all duration-200 
                                    cursor-pointer'
                            onClick={() =>{
                                setCurrentPage(currentPage + 1);
                            }}
                            >
                                <Image 
                                src="/upArrow.png" 
                                alt="loadMore" 
                                width={40}
                                height={35}
                                className="hover:scale-90 transition-all duration-200 rotate-180"
                                />
                            </button>
                        )}
                        
                        </>
                    )}
                    
                        
                </div>
                
                <NewChatButton
                setChatModal={setChatModal}
                />

                {chatModal && (
                    <div className='absolute left-0 w-full h-[auto] bg-[#484848]/86 px-7 
                                    fade-in-create-chat overflow-y-hidden'>
                        <CreateChatForm 
                        setChatModal={setChatModal} 
                        setChats={setChats} 
                        setError={setError}
                        />
                    </div>
                )}
                {error !== "" && (
                    <Alert 
                    message={error} 
                    color="bg-red-600"
                    />
                )}
            </section>
        </main>
    )
}