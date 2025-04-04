import { contentMessage } from "@/interfaces/interfaces";
import { getToken } from "@/utils/localstorage";
import axios from "axios";

export async function getMessages(chatId: number, totalPages: number) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    const token = getToken();
    try{
        const response = await axios.get<contentMessage>(`${url}api/v1/message/${chatId}?page=${totalPages - 1}`,{
            headers: {"Authorization": `Bearer ${token}`},
        });

        return response.data.content;
    }catch{
        return [];
    }
}