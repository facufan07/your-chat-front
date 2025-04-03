import { chat } from "@/interfaces/interfaces";
import { getToken } from "@/utils/localstorage";
import axios from "axios";

export async function CreateChat(name: string) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    const token = getToken();
    try{
        const response = await axios.post<chat>(`${url}api/v1/chat`, { name: name }, {
            headers: {"Authorization": `Bearer ${token}`},
        });

        return { status: response.status, data: response.data };
    }
    catch(error){
        if(axios.isAxiosError(error)){
            return { status: error.response?.status, data: error.response?.data };
        }

        return { status: 500 , data: null };
    }

}