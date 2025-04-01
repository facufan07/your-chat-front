import axios from "axios";

import { error } from "@/interfaces/interfaces";

export async function loginAuth(mail: string, password: string):Promise<number | error> {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try {
        const res = await axios.post<number>(`${url}api/v1/auth/login`, 
            { mail: mail, password: password }, 
            { withCredentials: true });
        console.log("Token recibido:", res.data);
        return res.data;
    } catch (err: any) {
        if(axios.isAxiosError(err)) {
            console.log(err.response?.data);
            return err.response?.data;
        }else{
            console.error(err);
            return err;
        }
    }
}