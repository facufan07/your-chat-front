import { chat } from "@/interfaces/interfaces";
import axios from "axios";

export async function CreateChat(name: string) {
    try{
        const response = await axios.post<chat>("http://localhost:8080/api/v1/chat", { name: name }, {
            withCredentials: true,
        });

        return response.status;
    }
    catch(error){
        if(axios.isAxiosError(error)){
            return error.status;
        }

        console.error(error);
    }

}