"use client"

import Image from "next/image"
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en"

interface chatContainerProps{
    name: string;
    creationDate: string;
    lastMessageDate: string;
}

export default function ChatContainer({ name, creationDate, lastMessageDate }: chatContainerProps) {

    const [moreInfo, setMoreInfo] = useState<boolean>(false);

    dayjs.locale("en");

    const creationDateFormatted = dayjs(creationDate).format("DD/MM/YYYY");
    const lastMessageDateFormatted = dayjs(lastMessageDate).format("DD/MM/YYYY");

    return (
        <div 
        className="bg-black w-[400px] h-[55px] flex items-center justify-between px-4 relative"
        >
            <button className="mt-0.5" title="More info" onClick={() => setMoreInfo(true)}>
                <Image 
                src="/dotts.png" 
                alt="logo" 
                width={40}
                height={35}
                className="hover:scale-90 transition-all duration-200 cursor-pointer"
                />
            </button>
            <h1 
            className="text-white text-xl tracking-widest font-semibold truncate w-[200px]"
            title={name}
            >
            {name}
            </h1>
            <div className="mt-2">
                <button title="Delete chat">
                    <Image 
                    src="/eliminate.png" 
                    alt="logo" 
                    width={40}
                    height={35}
                    className="hover:scale-90 transition-all duration-200 cursor-pointer"
                    />
                </button>
                <button className="ml-3" title="Open chat">
                    <Image 
                    src="/Messagingg.png" 
                    alt="logo" 
                    width={30}
                    height={35}
                    className="hover:scale-90 transition-all duration-200 cursor-pointer"
                    />
                </button>
            </div>

            {moreInfo &&(
                <button 
                className="absolute bg-black w-[400px] h-[55px] flex items-center justify-between 
                            px-4 left-[0px] cursor-pointer hover:bg-black/66 transition-all duration-200"
                onClick={() => setMoreInfo(false)}
                >
                    <h1 
                    className="text-white text-xs tracking-widest font-semibold truncate w-[200px]
                                border-r-2"
                    title={creationDate}
                    >
                    Creation date: {creationDateFormatted}
                    </h1>
                    <h1 
                    className="text-white text-xs tracking-widest font-semibold truncate w-[200px]"
                    title={lastMessageDate}
                    >
                    Last message: {lastMessageDateFormatted}
                    </h1>
                </button>
            )}
        </div>
    )
}