import { contentMessage, totalPages } from "@/interfaces/interfaces";
import axios from "axios";

export async function getMessages(chatId: number) {
    try{
        const res = await axios.get<totalPages>(`http://localhost:8080/api/v1/message/${chatId}`,{
            withCredentials: true,
        });

        console.log(res.data.totalPages);

        const response = await axios.get<contentMessage>(`http://localhost:8080/api/v1/message/${chatId}?page=${res.data.totalPages - 1}`,{
            withCredentials: true,
        });

        console.log(response.data.content);

        return response.data.content;
    }catch{
        return [];
    }
}