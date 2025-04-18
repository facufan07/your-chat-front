import { error, token } from "@/interfaces/interfaces";
import { saveToken } from "@/utils/localstorage";
import axios from "axios";

export async function RegisterAuth(mail: string, password: string, repeatPassword: string):Promise<number | error>{
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
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


backendMessage
: 
"could not execute statement [Duplicate entry 'fandinofacundo123@gmail.com' for key 'user.UK6sou31qus5dnws6dwfu61e71v'] [insert into user (creation_date,mail,password,role) values (?,?,?,?)]; SQL [insert into user (creation_date,mail,password,role) values (?,?,?,?)]; constraint [user.UK6sou31qus5dnws6dwfu61e71v]"
message
: 
"Error interno del servidor, intentelo mas tarde"
method
: 
"POST"
timestamp
: 
"2025-04-01T15:32:06.023767"
url
: 
"http://localhost:8080/api/v1/auth/register"