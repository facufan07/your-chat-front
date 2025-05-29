import { getToken } from "@/utils/localstorage";
import axios from "axios";

export async function CreateMessage(chatId: number, text: string, type: boolean){
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://api.apiapp.shop/" : "http://localhost:8080/";
    const token = getToken();
    try{
        const response = await axios.post(`${url}api/v1/message`,{
            chatId: chatId,
            message: text,
            type: type,
        }, {headers: {"Authorization": `Bearer ${token}`},});

        return response.data;
        
    }catch{
        return false;
    }
}