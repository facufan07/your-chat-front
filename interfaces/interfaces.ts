export interface error{
    backendMessage: string;
    message: string;
    method: string;
    url: string;
    timestamp: string;
}

export interface contentChat{
    content: chat[];
    
}

export interface chat{
    id: number;
    name: string;
    creationDate: string;
    lastMessageDate: string;
}