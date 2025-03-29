import axios from "axios";
import { contentChat } from "@/interfaces/interfaces";

export async function getChats(page: number) {
    try{
        
        const response = await axios.get<contentChat>("http://localhost:8080/api/v1/chat?page=" + page, {
            withCredentials: true,
        });

        return response.data.content;
    }
    catch{
        return [];
    }
}