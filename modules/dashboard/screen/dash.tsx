import Image from 'next/image'
import Browser from '../components/browser'
import ChatContainer from '../components/chatContainer'
import NewChat from '../components/newChat'
import "./dash.css"

export default function Dash() {
    return(
        <main className="h-dvh w-dvw flex justify-center items-center">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className='bg-black/76 w-[35%] h-[75%] flex flex-col items-center relative'>
                <Image 
                src="/logoyourchatt.png" 
                alt="logo" 
                width={300}
                height={400}
                className="mt-10"
                />
                <Browser/>
                <div className='flex flex-col items-center h-[250px] overflow-y-auto gap-8 scroll px-2'>
                    <ChatContainer/>
                    <ChatContainer/>
                    <ChatContainer/>
                    <ChatContainer/>
                    <ChatContainer/>
                    <ChatContainer/>
                </div>
                
                <NewChat/>
            </section>
        </main>
    )
}