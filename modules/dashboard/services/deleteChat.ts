import axios from "axios";

export async function DeleteChat(id: number){
    try{
        const response = await axios.delete(`https://your-chat-back-production.up.railway.app/api/v1/chat/${id}`, {
            withCredentials: true
        });
        return response.status;
    }catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.status;
        }
        console.error(err);
    }
}