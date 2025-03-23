import axios from "axios";

export async function DeleteChat(id: number){
    try{
        const response = await axios.delete(`http://localhost:8080/api/v1/chat/${id}`, {
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