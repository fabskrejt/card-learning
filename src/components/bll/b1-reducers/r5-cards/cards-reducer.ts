import {Dispatch} from "redux";
import {cardsApi} from "../../../../dal/cardsApi";
import {AppStateType} from "../../b2-store/store";
import {ThunkAction} from "redux-thunk";

const initState = {
    cards: [],
    cardsTotalCount: 0,
    maxGrade: 5,
    minGrade: 0,
    page: 1,
    pageCount: 4,
    packUserId: ''
}

export const cardsReducer = (state: InitStateType = initState, action: CardsActionType): InitStateType => {
    switch (action.type) {
        case "CARD-REDUCER/SET-CARDS":
            return {
                ...state, cards: action.cards, cardsTotalCount: action.cardsTotalCount
            }
        case "CARD-REDUCER/SET-PAGE":
            return {
                ...state, page: action.page
            }
        case "CARD-REDUCER/SET-PAGE-COUNT":
            return {
                ...state, pageCount: action.pageCount
            }
        default:
            return state
    }
}

type SetCardsAT = ReturnType<typeof setCards>
export const setCards = (cards: Array<Cards>, cardsTotalCount: number) => {
    return {
        type: "CARD-REDUCER/SET-CARDS",
        cards, cardsTotalCount
    } as const
}

export type SetCardsPageAT = ReturnType<typeof setCardsPage>
export const setCardsPage = (page: number) => {
    return {
        type: "CARD-REDUCER/SET-PAGE",
        page,
    } as const
}

export type SetCardsPageCountAT = ReturnType<typeof setCardsPageCount>
export const setCardsPageCount = (pageCount: number) => {
    return {
        type: "CARD-REDUCER/SET-PAGE-COUNT",
        pageCount,
    } as const
}

//Thunks
export const setCardsTC = (cardsPackID: string): ThunkType =>
    (dispatch, getState: () => AppStateType) => {
        const pageCount = getState().cards.pageCount
        const page = getState().cards.page
        cardsApi.getCards(cardsPackID, pageCount, page)
            .then((res) => {
                    debugger
                    dispatch(setCards(res.data.cards, res.data.cardsTotalCount))
                }
            )
    }

export const createCardTC = (cardsPack_id: string, question: string, answer: string): ThunkType =>
    dispatch => {
        cardsApi.createCard(cardsPack_id, question, answer)
            .then(() => dispatch(setCardsTC(cardsPack_id)))
    }

export const deleteCardTC = (card_id: string): ThunkType =>
    dispatch => {
        cardsApi.deleteCard(card_id)
            .then((res) => dispatch(setCardsTC(res.data.deletedCard.cardsPack_id)))
    }
export const changeCardTC = (card_id: string, question: string, answer: string): ThunkType =>
    dispatch => {
        cardsApi.changeCard(card_id, question, answer)
            .then((res) => {
                dispatch(setCardsTC(res.data.updatedCard.cardsPack_id))
            })
    }

//Types
//type InitStateType = typeof initState
type InitStateType = {
    cards: Array<Cards>,
    cardsTotalCount: number,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string
}
type CardsActionType =
    SetCardsAT
    | SetCardsPageAT
    | SetCardsPageCountAT

type  ThunkType = ThunkAction<void, AppStateType, unknown, CardsActionType>
export type Cards = {
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
