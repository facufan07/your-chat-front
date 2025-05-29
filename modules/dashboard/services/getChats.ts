import axios from "axios";
import { contentChat } from "@/interfaces/interfaces";
import { getToken } from "@/utils/localstorage";

export async function getChats(page: number) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://api.apiapp.shop/" : "http://localhost:8080/";
    const token = getToken();
    
    try{
        
        const response = await axios.get<contentChat>(`${url}api/v1/chat?page=` + page, {
            headers: {"Authorization": `Bearer ${token}`},
        });

        return response.data.content;
    }
    catch{
        return [];
    }
}