import axios from "axios";

export async function RegisterAuth(mail: string, password: string, repeatPassword: string){
    try{
        const res = await axios.post("https://your-chat-back-production.up.railway.app/api/v1/auth/register", { mail: mail, password: password, repeatedPassword: repeatPassword }, { withCredentials: true });
        
        return res.status;
    }catch(err: any){
        if(axios.isAxiosError(err)){
            return err.response?.status;
        }
    }
}