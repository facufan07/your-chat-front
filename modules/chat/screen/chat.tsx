"use client"

import Image from 'next/image'
import Link from 'next/link';
import UtilBar from '../components/utilBar';
import Messages from '../components/messages';
import { useState } from 'react';
import { message } from '@/interfaces/interfaces';


export default function Chat({ chatId }: { chatId: string }) {

    const name = chatId.split("-")[0].replace(/_/g, " ");
    const id = parseInt(chatId.split("-")[1]);

    const [message, setMessage] = useState<message[]>([]);

    return (
        <main className="h-dvh w-dvw flex justify-center items-center">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className='bg-black/76 w-[35%] h-[75%] max-sm:w-[95%] flex flex-col items-center relative 
                                max-lg:w-[90%]'>
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

                <Messages chatId={id} messages={message} setMessages={setMessage}/>
                
                <UtilBar chatId={id} messages={message} setMessages={setMessage}/>
            </section>
        </main>
    );
}