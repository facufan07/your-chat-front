import axios from "axios";

export async function DeleteChat(id: number){
    const url = process.env.ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const response = await axios.delete(`${url}api/v1/chat/${id}`, {
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