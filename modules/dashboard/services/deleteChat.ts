import { getToken } from "@/utils/localstorage";
import axios from "axios";

export async function DeleteChat(id: number) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    const token = getToken();
    
    try{
        const response = await axios.delete(`${url}api/v1/chat/${id}`, {
            headers: {"Authorization": `Bearer ${token}`},
        });
        return response.status;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.status;
        }
        return 500;
    }
}