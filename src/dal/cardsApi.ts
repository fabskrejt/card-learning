import axios from "axios"

const instance = axios.create({
    baseURL: "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authApi = {
    ping() {
        return instance.get("ping")
    },
    registerUser(email: string, password: string){
        return instance.post<RegisterRequestType>("auth/register", {email, password})
    },
    login(email: string, password: string, rememberMe: boolean){
        return instance.post<LoginRequestType>( "/auth/login",{email, password, rememberMe})
    }
}

type RegisterRequestType = {
    error?: string
}

type LoginRequestType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}