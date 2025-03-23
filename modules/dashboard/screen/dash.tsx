"use client"

import Image from 'next/image'
import Browser from '../components/browser'
import ChatContainer from '../components/chatContainer'
import NewChatButton from '../components/newChatButton'
import { useEffect, useState } from 'react'
import { getChats } from '../services/getChats'
import { chat } from "@/interfaces/interfaces";

import "./dash.css"
import CreateChatForm from '../components/createChatForm'

export default function Dash() {
    const [chats, setChats] = useState<chat[]>([]);
    const [chatModal, setChatModal] = useState<boolean>(false);
    const [reload, setReload] = useState<number>(0);

    useEffect(() => {
        if(chatModal){
            setChatModal(false);
        }

        const handleChat = async () => {
            try{
                const data = await getChats();
                setChats(data);
            }
            catch{
                setChats([]);
            }
        }

        handleChat();
    },[reload])

    

    return(
        <main className="h-dvh w-dvw flex justify-center items-center">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className='bg-black/76 w-[35%] h-[75%] max-sm:w-[95%] flex flex-col items-center relative 
                                max-lg:w-[90%]'>
                <Image 
                src="/logoyourchatt.png" 
                alt="logo" 
                width={300}
                height={400}
                className="mt-10"
                />
                <Browser/>
                <div className='flex flex-col items-center h-[250px] overflow-y-auto gap-8 scroll px-2'>
                    {chats.map((chat) => (
                        <ChatContainer 
                        key={chat.id} 
                        name={chat.name} 
                        creationDate={chat.creationDate} 
                        lastMessageDate={chat.lastMessageDate}
                        id={chat.id}
                        setReload={setReload}
                        reload={reload}
                        />
                    ))}
                </div>
                
                <NewChatButton
                setChatModal={setChatModal}
                />

                {chatModal && (
                    <div className='absolute left-0 w-full h-[auto] bg-[#484848]/86 px-7 py-5'>
                        <CreateChatForm setChatModal={setChatModal} setReload={setReload} reload={reload}/>
                    </div>
                )}
            </section>
        </main>
    )
}