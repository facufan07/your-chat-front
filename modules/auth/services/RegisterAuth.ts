import { error, token } from "@/interfaces/interfaces";
import { saveToken } from "@/utils/localstorage";
import axios from "axios";

export async function RegisterAuth(mail: string, password: string, repeatPassword: string):Promise<number | error>{
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://api.apiapp.shop/" : "http://localhost:8080/";
    try{
        const res = await axios.post<token>(`${url}api/v1/auth/register`, { mail: mail, password: password, repeatedPassword: repeatPassword });
        
        saveToken(res.data.token);
        
        return res.status;
    }catch(err: any){
        if(axios.isAxiosError(err)){
            console.log(err.response?.data)
            return err.response?.data;
        }
        
        return 500;
    }
}
