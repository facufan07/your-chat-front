import { totalPages } from "@/interfaces/interfaces";
import axios from "axios";

export async function getLastPage(chatId: number, path: string) {
    try{
        const res = await axios.get<totalPages>(`http://localhost:8080/api/v1/${path}${chatId === -1 ? "" : `/${chatId}`}`,{
            withCredentials: true,
        });
        console.log(res.data.totalPages);
        return res.data.totalPages;
    }catch{
        console.log("error");
        return 1;
    }
}