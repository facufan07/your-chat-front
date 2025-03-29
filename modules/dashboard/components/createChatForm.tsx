"use client"
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Image from "next/image";
import { CreateChat } from "../services/createChat";
import { chat } from "@/interfaces/interfaces";


interface CreateChatFormProps {
    setChatModal: (modal: boolean) => void;
    setChats: Function;
    setError:Function
}

export default function CreateChatForm({ setChatModal, setError, setChats } : CreateChatFormProps) {
    const [name, setName] = useState<string>("");
    const [isDisabled, setIsDisabled] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDisabled(true);
        try{
            const response = await CreateChat(name);
            if(response.status === 201){
                setChats((prevChats: chat[]) => [response.data, ...prevChats]);
                setChatModal(false);
                return;
            }

            setIsDisabled(false);
            setError("An error has ocurred, try again later.");
            setTimeout(() => {
                setError("");
            }, 2000);
        }
        catch(error){
            setIsDisabled(false);
            setError("An error has ocurred, try again later.");
            setTimeout(() => {
                setError("");
            }, 2000);
        };
    }

    return (
        <>
        <div className="w-full flex justify-between mb-5 items-center pt-5">
            <h1 className="text-white text-2xl tracking-widest font-semibold">Create your chat</h1>
            <button className="cursor-pointer" onClick={() => setChatModal(false)}>
                <Image 
                src="/Close.png" 
                alt="logo" 
                width={40}
                height={35}
                className="hover:scale-90 transition-all duration-200
                "
                />
            </button>
        </div>
        <form onSubmit={handleSubmit} action="" className="flex flex-col items-center pb-5">
            <TextField
            label="Name of your chat"
            variant="outlined"
            className="bg-black/54 rounded-lg shadow-lg"
            fullWidth
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            sx={{
                "& .MuiInputLabel-root": {
                color: "#fff",
                letterSpacing: "1.5px",
                },
                "& .MuiOutlinedInput-root": {
                "& input": {
                    color: "#fff",
                    letterSpacing: "1.5px",
                },
                },
            }}
            />

            <button 
            type="submit"
            className="bg-white/30 px-4 py-2 rounded-lg tracking-widest text-lg cursor-pointer 
                        font-semibold hover:scale-90 transition-all duration-200 text-white mt-5"
            disabled={name === "" || isDisabled}
            >
            Create
            </button>
        </form>
        
        </>
    )
}