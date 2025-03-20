import Image from "next/image"

export default function ChatContainer() {
    return (
        <div 
        className="bg-black w-[400px] h-[55px] flex items-center justify-between px-4"
        >
            <button className="mt-0.5">
                <Image 
                src="/dotts.png" 
                alt="logo" 
                width={40}
                height={35}
                className="hover:scale-90 transition-all duration-200 cursor-pointer"
                />
            </button>
            <h1 className="text-white text-xl tracking-widest font-semibold">Chat</h1>
            <div className="mt-2">
                <button>
                    <Image 
                    src="/eliminate.png" 
                    alt="logo" 
                    width={40}
                    height={35}
                    className="hover:scale-90 transition-all duration-200 cursor-pointer"
                    />
                </button>
                <button className="ml-3">
                    <Image 
                    src="/Messagingg.png" 
                    alt="logo" 
                    width={30}
                    height={35}
                    className="hover:scale-90 transition-all duration-200 cursor-pointer"
                    />
                </button>
            </div>
        </div>
    )
}