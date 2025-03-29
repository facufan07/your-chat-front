"use client";

import { useState } from "react";
import Image from "next/image";

export default function Alert({ message, color } : { message: string, color: string }) {

    const [show, setShow] = useState<boolean>(true);

    return(
        <div className={`w-full flex justify-center items-center ${color} 
                        ${show ? "" : "hidden"} absolute z-50 py-3 px-2`}>
            
            <button
            className="cursor-pointer absolute top-2 right-2"
            onClick={() => setShow(false)}
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

            <p className="text-white tracking-widest text-xl w-[80%]">{message}</p>
        </div>
    )
}