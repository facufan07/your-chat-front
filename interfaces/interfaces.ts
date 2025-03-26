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

export interface contentMessage{
    content: message[];
}

export interface message{
    id: number;
    text: string;
    type: boolean;
    creationDate: string;
}

export interface totalPages{
    totalPages: number;
}