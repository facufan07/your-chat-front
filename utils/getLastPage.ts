import { totalPages } from "@/interfaces/interfaces";
import axios from "axios";
import { getToken } from "./localstorage";

export async function getLastPage(chatId: number, path: string) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://api.apiapp.shop/" : "http://localhost:8080/";
    const token = getToken();
    
    try{
        const res = await axios.get<totalPages>(`${url}api/v1/${path}${chatId === -1 ? "" : `/${chatId}`}`,{
            headers: {"Authorization": `Bearer ${token}`},
        });
        return res.data.totalPages;
    }catch{
        console.log("error");
        return 1;
    }
}