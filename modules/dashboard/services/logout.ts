import axios from "axios";

export async function logout() {
    try{
        const response = await axios.post("http://localhost:8080/api/v1/auth/logout", {},
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