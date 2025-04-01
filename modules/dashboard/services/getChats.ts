import axios from "axios";
import { contentChat } from "@/interfaces/interfaces";

export async function getChats(page: number) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        
        const response = await axios.get<contentChat>(`${url}api/v1/chat?page=` + page, {
            withCredentials: true,
        });

        return response.data.content;
    }
    catch{
        return [];
    }
}