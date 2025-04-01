import axios from "axios";

export async function RegisterAuth(mail: string, password: string, repeatPassword: string){
    const url = process.env.ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const res = await axios.post(`${url}api/v1/auth/register`, { mail: mail, password: password, repeatedPassword: repeatPassword }, { withCredentials: true });
        
        return res.status;
    }catch(err: any){
        if(axios.isAxiosError(err)){
            return err.response?.status;
        }
    }
}