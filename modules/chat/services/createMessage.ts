import axios from "axios";

export async function CreateMessage(chatId: number, text: string, type: boolean){
    const url = process.env.ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const response = await axios.post(`${url}api/v1/message`,{
            chatId: chatId,
            message: text,
            type: type,
        }, {withCredentials: true});

        return response.data;
        
    }catch{
        return false;
    }
}