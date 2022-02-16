import {Dispatch} from "redux";
import {cardPacksApi, cardsApi} from "../../../../dal/cardsApi";


const initState = {
    cards: [{}],
    cardsTotalCount: 3,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    packUserId: ''
}
type Cards = {
    answer: string
    question: string
    cardsPack_id: string
    grade: number
    rating: number
    shots: number
    type: string
    user_id: string
    created: string
    updated: string
    __v: number
    _id: string
}
type InitStateType = typeof initState
type CardsActionType = SetCards
export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case "PACKS-REDUCER/SET-CARDS":
            return {
                ...state, cards: action.cards
            }

        default:
            return state
    }
}

type SetCards = ReturnType<typeof setCards>
export const setCards = (cards: Array<Cards>) => {
    return {
        type: "PACKS-REDUCER/SET-CARDS",
        cards,
    } as const
}


export const createPack = (name: string) => {
    return {
        type: "PACKS-REDUCER/CREATE-PACK",
        name,
    } as const
}

type deletePackAT = ReturnType<typeof deletePack>
export const deletePack = (id: string) => {
    return {
        type: "PACKS-REDUCER/DELETE-PACK",
        id,
    } as const
}


export const setCardsTC = (cardsPackID:string) =>
    (dispatch: Dispatch) => {
        cardsApi.getCards(cardsPackID)
            .then((res) => {
                    debugger
                    dispatch(setCards(res.data.cardPacks))
                }
            )
    }


export const createPackTC = (name: string, deckCover: string = '', privat: boolean) => (dispatch: Dispatch) => {
    cardPacksApi.createCardsPack(name, deckCover, privat)
        .then(() => cardPacksApi.getCardPacks())
}
