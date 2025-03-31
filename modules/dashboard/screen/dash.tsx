"use client"

import Image from 'next/image'
import Browser from '../components/browser'
import ChatContainer from '../components/chatContainer'
import NewChatButton from '../components/newChatButton'
import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { getChats } from '../services/getChats'
import { chat } from "@/interfaces/interfaces";
import CircularProgress from '@mui/material/CircularProgress';

import "./dash.css"
import CreateChatForm from '../components/createChatForm'
import Alert from '@/utils/alert'
import { getLastPage } from '@/utils/getLastPage'
import { logout } from '../services/logout'

export default function Dash() {
    const router = useRouter();

    const [chats, setChats] = useState<chat[]>([]);
    const [modal, setModal] = useState<string>("");
    const [error , setError] = useState<string>("");

    const chatsRef = useRef<HTMLDivElement>(null);
    const [maxPage, setMaxPage] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if(modal.length > 0){
            setModal("");
        }

        const handleChat = async () => {
            try{
                const pages = await getLastPage(-1, "chat");
                const data = await getChats(currentPage);
                setChats(data);
                setLoading(false);
                setMaxPage(pages - 1);
                
            }
            catch{
                setChats([]);
                setLoading(false);
            }
        }
        
        handleChat();
        return;
    },[])

    async function handleLogout(){
        const res = await logout();
        if(res === 200){
            router.push("/login");
        }

    }

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
                    {loading === false ?(

                        chats.length === 0  ?(
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
                                className='rounded-full bg-[#484848]/86 p-2 hover:bg-black/76 transition-all 
                                        duration-200 cursor-pointer'
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
                        )
                    ):(
                        <CircularProgress/>
                    )}
                    
                        
                </div>
                
                <div
                className='flex items-end w-full px-5 h-full mb-5'
                >   
                    <div className='flex items-center justify-between w-full'>
                        <button 
                        className='cursor-pointer bg-[#484848]/86 p-2 rounded-full 
                                hover:bg-black/76 transition-all duration-200'
                        onClick={() => setModal("user")}
                        >
                            <Image 
                            src="/user.png" 
                            alt="loadMore" 
                            width={40}
                            height={35}
                            className="hover:scale-90 transition-all duration-200"
                            />
                        </button>
                        <NewChatButton
                        setChatModal={setModal}
                        />
                    </div>

                </div>
                

                {modal === "createChat" && (
                    <div className='absolute left-0 w-full h-[auto] bg-[#484848]/86 px-7 
                                    fade-in-create-chat overflow-y-hidden'>
                        <CreateChatForm 
                        setChatModal={setModal} 
                        setChats={setChats} 
                        setError={setError}
                        />
                    </div>
                )}

                {modal === "user" && (
                    <div className='absolute left-0 w-full h-[auto] bg-[#484848]/86 px-7 
                                    fade-in-create-chat overflow-y-hidden flex justify-center'>
                        
                        <button 
                        className="cursor-pointer absolute top-5 right-5" 
                        onClick={() => setModal("")}
                        >
                            <Image 
                            src="/Close.png" 
                            alt="logo" 
                            width={40}
                            height={35}
                            className="hover:scale-90 transition-all duration-200
                            "
                            />
                        </button>
                        
                        <button
                        className='px-4 py-2 rounded-xl tracking-widest text-lg cursor-pointer
                                    font-semibold hover:scale-90 transition-all duration-200
                                    text-white bg-black/56 my-5'
                        onClick={handleLogout}
                        >
                            Logout
                        </button>
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