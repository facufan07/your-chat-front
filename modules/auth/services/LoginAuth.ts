import axios from "axios";

interface error{
    backendMessage: string;
    message: string;
    method: string;
    url: string;
    timestamp: string;
}

export async function loginAuth(mail: string, password: string):Promise<number | error> {
    try {
        const res = await axios.post<number>("http://localhost:8080/api/v1/auth/login", { mail: mail, password: password }, { withCredentials: true });
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