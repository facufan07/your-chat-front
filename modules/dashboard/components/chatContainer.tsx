"use client"

import Image from "next/image"
import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/en"
import { DeleteChat } from "../services/deleteChat";

interface chatContainerProps{
    name: string;
    creationDate: string;
    lastMessageDate: string;
    id: number;
    setReload: (reload: number) => void;
    reload: number;
}

export default function ChatContainer({ name, creationDate, lastMessageDate, id, reload, setReload }: chatContainerProps) {

    const [moreInfo, setMoreInfo] = useState<boolean>(false);
    const [deleteChat, setDeleteChat] = useState<boolean>(false);

    dayjs.locale("en");

    const creationDateFormatted = dayjs(creationDate).format("DD/MM/YYYY");
    const lastMessageDateFormatted = dayjs(lastMessageDate).format("DD/MM/YYYY");

    const handleEliminate = () => {
        DeleteChat(id).then((response) => {
            console.log(response);
            if(response === 204){
                setReload(reload + 1);
            }
        });
    }

    return (
        <div 
        className="bg-black w-[100%] min-h-[55px] flex items-center justify-between px-4 relative
                    max-sm:w-[100%]"
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
            className="text-white text-xl tracking-widest font-semibold truncate w-[200px] ml-2"
            title={name}
            >
            {name}
            </h1>
            <div className="flex">
                <button 
                title="Delete chat"
                onClick={() => setDeleteChat(true)}
                >
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
                className="absolute bg-black w-[100%] h-[55px] flex items-center justify-between 
                            px-4 left-[0px] top-0 cursor-pointer hover:bg-black/66 transition-all duration-200
                            flex-col py-2"
                onClick={() => setMoreInfo(false)}
                >
                    <h1 
                    className="text-white text-xs tracking-widest font-semibold truncate w-[200px]
                                "
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

            {deleteChat &&(
                <div
                className="absolute bg-black w-[400px] h-[55px] flex items-center 
                            justify-between px-4 left-[0px] top-0 max-sm:w-[100%]"
                >
                    <span
                    className="text-white text-xs tracking-widest font-semibold"
                    >
                    Want to delete this chat?
                    </span>
                    
                    <div className="h-full flex items-center gap-3">
                        <button 
                        title="Accept"
                        onClick={handleEliminate}
                        >
                            <Image 
                            src="/Done.png" 
                            alt="logo" 
                            width={35}
                            height={35}
                            className="hover:scale-90 transition-all duration-200 
                                        cursor-pointer"
                            />
                        </button>
                        <button 
                        title="Cancel"
                        onClick={() => setDeleteChat(false)}
                        >
                            <Image 
                            src="/eliminate.png" 
                            alt="logo" 
                            width={35}
                            height={35}
                            className="hover:scale-90 transition-all duration-200 
                                        cursor-pointer"
                            />
                        </button>
                    </div>
                    
                    
                </div>
            )}
        </div>
    )
}