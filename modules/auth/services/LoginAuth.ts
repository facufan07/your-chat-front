import axios from "axios";

import { error, token } from "@/interfaces/interfaces";
import { saveToken } from "@/utils/localstorage";

export async function loginAuth(mail: string, password: string):Promise<number | error> {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try {
        const res = await axios.post<token>(`${url}api/v1/auth/login`, 
            { mail: mail, password: password })
        
        saveToken(res.data.token);
        
        return res.status;
    } catch (err: any) {
        if(axios.isAxiosError(err)) {
            return err.response?.data;
        }else{
            return err;
        }
    }
}

