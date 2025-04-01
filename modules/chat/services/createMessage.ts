import axios from "axios";

export async function CreateMessage(chatId: number, text: string, type: boolean){
    try{
        const response = await axios.post(`https://your-chat-back-production.up.railway.app/api/v1/message`,{
            chatId: chatId,
            message: text,
            type: type,
        }, {withCredentials: true});

        return response.data;
        
    }catch{
        return false;
    }
}