import axios from "axios"

const instance = axios.create({
    // baseURL: "https://neko-back.herokuapp.com/2.0/",
    baseURL: process.env.REACT_APP_BACK_URL || "http://localhost:7542/2.0/",
    withCredentials: true,
})

export const authApi = {
    ping() {
        return instance.get("ping")
    },
    isAuthUser() {
        return instance.post<LoginRequestType>("auth/me", {})
    },
    login(email: string, password: string, rememberMe: boolean) {
        return instance.post<LoginRequestType>("/auth/login", {email, password, rememberMe})
    },
    logout() {
        return instance.delete("auth/me", {})
    },
    registerUser(email: string, password: string) {
        return instance.post<RegisterRequestType>("auth/register", {email, password})
    },
    passwordRecovery(email: string) {
        const message = `<div style="background-color: lime; padding: 15px">
                        password recovery link: 
                     <a href='https://leonshus.github.io/Cards/#/new-pass/$token$'>link</a></div>`
        return instance.post("auth/forgot", {email, message})
    },
    createNewPass(password: string, resetPasswordToken: string) {
        return instance.post("auth/set-new-password", {password, resetPasswordToken})
    }

}

export const cardPacksApi = {
    getCardPacks(userId: string) {
        return instance.get(`/cards/pack?user_id=${userId}`)
    },
    createCardsPack(name: string, deckCover: string, privat: boolean) {
        return instance.post("/cards/pack", {cardsPack: {name, deckCover, private: privat}})
    },
    deleteCardsPack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`, {})
    },
    changeCardsPackName(_id: string, name:string) {
        return instance.put(`/cards/pack`, {cardsPack: {_id, name}})
    },
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