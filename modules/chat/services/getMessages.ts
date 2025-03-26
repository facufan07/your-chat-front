import { contentMessage } from "@/interfaces/interfaces";
import axios from "axios";

export async function getMessages(chatId: number, totalPages: number) {
    try{
        const response = await axios.get<contentMessage>(`http://localhost:8080/api/v1/message/${chatId}?page=${totalPages - 1}`,{
            withCredentials: true,
        });

        console.log(response.data.content);

        return response.data.content;
    }catch{
        return [];
    }
}