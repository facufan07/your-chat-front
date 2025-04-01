import { contentMessage } from "@/interfaces/interfaces";
import axios from "axios";

export async function getMessages(chatId: number, totalPages: number) {
    const url = process.env.ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const response = await axios.get<contentMessage>(`${url}api/v1/message/${chatId}?page=${totalPages - 1}`,{
            withCredentials: true,
        });

        console.log(response.data.content);

        return response.data.content;
    }catch{
        return [];
    }
}