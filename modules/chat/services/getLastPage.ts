import { totalPages } from "@/interfaces/interfaces";
import axios from "axios";

export async function getLastPage(chatId: number) {
    try{
        const res = await axios.get<totalPages>(`http://localhost:8080/api/v1/message/${chatId}`,{
            withCredentials: true,
        });
        console.log(res.data.totalPages);
        return res.data.totalPages;
    }catch{
        console.log("error");
        return 0;
    }
}