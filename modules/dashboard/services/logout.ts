import axios from "axios";

export async function logout() {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const response = await axios.post(`${url}api/v1/auth/logout`, {},
            {
                withCredentials: true
            }
        );

        return response.status;
    }
    catch(err){
        if(axios.isAxiosError(err)){
            return err.response?.status;
        }
        return 500;
    }
}