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
    }
}

type RegisterRequestType = {
    error?: string
}