import Chat from "@/modules/chat/screen/chat";

export default async function ChatId( { params } : { params: Promise<{ chatId: string }> } ) {
    const chatId = (await params).chatId;

    return(<Chat chatId={chatId}/>);
}