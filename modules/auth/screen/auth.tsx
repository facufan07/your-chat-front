import Image from "next/image"
import Text from "../components/Text"
import LoginForm from "../components/LoginForm"

export default function Auth() {

    return(
        <main className="h-dvh w-dwh flex justify-center items-center">
            <Image 
            src="/backgroundLogin.png" 
            alt="background" 
            fill
            className="object-cover absolute z-[-1]"
            />

            <section className="flex bg-black/80 h-3/4 w-4/5">
                <Text/>
                <LoginForm/>
            </section>
        
        </main>
    )
}