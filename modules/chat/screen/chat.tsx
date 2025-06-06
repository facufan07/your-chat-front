"use client"

import Image from 'next/image'
import Link from 'next/link';
import UtilBar from '../components/utilBar';
import Messages from '../components/messages';
import { useEffect, useState } from 'react';
import { message } from '@/interfaces/interfaces';
import CircularProgress from '@mui/material/CircularProgress';
import "./chatScreen.css";
import { getMessages } from '../services/getMessages';
import { getLastPage } from '@/utils/getLastPage';
import { useRouter } from 'next/navigation';
import { getToken } from '@/utils/localstorage';


export default function Chat({ chatId }: { chatId: string }) {

    const router = useRouter();

    const name = chatId.split("-")[0].replace(/_/g, " ");
    const id = parseInt(chatId.split("-")[1]);

    const [message, setMessage] = useState<message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [error, setError] = useState<string>("");

    useEffect(() => {
        const token = getToken();

        if (token === null) {
            router.push("/login");
        }
        else{
            const handleMessages = async () => {
                setError("");
                try{
                    const pages = await getLastPage(id, "message");
    
                    const data = await getMessages(id, pages);
                    setMessage(data);
                    setCurrentPage(pages - 1)
                }
                catch{
                    setError("An error has ocurred, try again later.");
                }
                
                setLoading(false);
            }
            
            handleMessages();
        }
            
        
        
    },[])

    return (
        <main className="h-dvh w-dvw flex justify-center items-center overflow-x-hidden">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className='bg-black/76 w-[35%] h-[75%] max-sm:w-[97%] max-sm:h-[90%] flex flex-col items-center relative 
                                max-lg:w-[90%] fade-in'>
                <div className='bg-[#484848]/86 w-full py-3 px-5 flex items-center'>
                    <Link href={`/dashboard`}>
                        <button className='cursor-pointer mt-2' title='Back'>
                            <Image 
                            src="/Left.png" 
                            alt="background" 
                            width={50}
                            height={400}
                            className="hover:scale-90 transition-all duration-200"
                            />
                        </button>
                    </Link>
                    
                    <h1
                    className='tracking-widest text-white text-2xl font-semibold truncate w-full ml-5'
                    title={name}
                    >
                    {name}
                    </h1>
                </div>
                {error !== "" ?(
                    <div className='h-full w-full flex justify-center items-center'>
                        <span className='text-red-500 text-xl font-semibold tracking-widest'>
                            {error}
                        </span>
                    </div>
                ):(
                    loading ?(
                        <div className='h-full w-full flex justify-center items-center'>
                            <CircularProgress/>
                        </div>
                    ):(
                        <Messages 
                        chatId={id} 
                        messages={message} 
                        setMessages={setMessage}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        />
                    )
                )}
                
                <UtilBar chatId={id} messages={message} setMessages={setMessage}/>
            </section>
        </main>
    );
}