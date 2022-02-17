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
    createNewPass(password : string, resetPasswordToken : string) {
        return instance.post("auth/set-new-password", {password, resetPasswordToken})
    }

}

export const cardPacksApi = {
    getCardPacks(userId: string = '',min:number=0,max:number=9999,sortPacks:string='',page:number=1,pageCount:number = 4) {
        return instance.get(`/cards/pack?packName=${userId}&user_id=${userId}&min=${min}&max=${max}&sortPacks=${sortPacks}&page=${page}&pageCount=${pageCount}`)
    },
    createCardsPack(name: string, deckCover: string='', privat: boolean) {
        return instance.post("/cards/pack", {cardsPack: {name, deckCover, private: privat}})
    },
    deleteCardsPack(id: string) {
        return instance.delete(`/cards/pack?id=${id}`, {})
    },
    changeCardsPack(_id: string, name: string) {
        return instance.put(`/cards/pack`, {cardsPack: {_id, name}})
    },
}

export const cardsApi = {
    getCards(cardsPackID: string) {
        return instance.get(`/cards/card?cardsPack_id=${cardsPackID}`)
    },
    createCard(cardsPack_id: string, question: string, answer: string) {
        return instance.post(`/cards/card`, {card: {cardsPack_id, question, answer}})
    },
    deleteCard(_id: string) {
        return instance.delete(`/cards/card?id=${_id}`, {})
    },
    changeCard(_id: string, question: string, answer: string) {
        return instance.put(`/cards/card`, {card: {_id, question, answer}})
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