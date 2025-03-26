import axios from "axios";

export async function CreateMessage(chatId: number, text: string, type: boolean){
    try{
        const response = await axios.post(`http://localhost:8080/api/v1/message`,{
            chatId: chatId,
            message: text,
            type: type,
        }, {withCredentials: true});

        return response.data;
        
    }catch{
        return false;
    }
}