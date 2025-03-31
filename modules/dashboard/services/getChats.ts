import axios from "axios";
import { contentChat } from "@/interfaces/interfaces";

export async function getChats(page: number) {
    try{
        
        const response = await axios.get<contentChat>("https://your-chat-back-production.up.railway.app/api/v1/chat?page=" + page, {
            withCredentials: true,
        });

        return response.data.content;
    }
    catch{
        return [];
    }
}