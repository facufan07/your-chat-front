import { totalPages } from "@/interfaces/interfaces";
import axios from "axios";

export async function getLastPage(chatId: number, path: string) {
    const url = process.env.NEXT_PUBLIC_ENVIRONMENT === "production" ? "https://your-chat-back-production.up.railway.app/" : "http://localhost:8080/";
    try{
        const res = await axios.get<totalPages>(`${url}api/v1/${path}${chatId === -1 ? "" : `/${chatId}`}`,{
            withCredentials: true,
        });
        console.log(res.data.totalPages);
        return res.data.totalPages;
    }catch{
        console.log("error");
        return 1;
    }
}