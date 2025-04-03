const EXPIRATION_TIME = 15 * 60 * 1000;

export function saveToken(token: string):void {
    if (typeof window !== "undefined") {
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_token_expiration", String(Date.now() + EXPIRATION_TIME));
    }
}

export function getToken(): string | null {
    const token = localStorage.getItem("auth_token");
    const expiration = localStorage.getItem("auth_token_expiration");

    if (!token || !expiration) return null;

    if (Date.now() > Number(expiration)) {
        removeToken();
        return null;
    }

    if (typeof window !== "undefined") {
        return localStorage.getItem("auth_token");
    }

    return null;
}

export function removeToken():void {
    if(typeof window !== "undefined") {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_expiration");
    }
}