import { chat } from "@/interfaces/interfaces";
import axios from "axios";

export async function CreateChat(name: string) {
    try{
        const response = await axios.post<chat>("http://localhost:8080/api/v1/chat", { name: name }, {
            withCredentials: true,
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