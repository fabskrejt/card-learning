import {Cards} from "../r5-cards/cards-reducer";
import {Dispatch} from "redux";
import {cardsApi} from "../../../../dal/cardsApi";


const initState = {
    cards: [] as Cards[],
    isFetchingLearnPage: false
}

type LearnCardsReducerInitType = typeof initState
type LearnCardsActionType = SetCardsToLearnAT | SetIsFetchingLearnPageAT | SetCardGradeAT

export const learnCardsReducer = (state: LearnCardsReducerInitType = initState, action: LearnCardsActionType) => {
    switch (action.type) {
        case "LEARN-CARDS-REDUCER/SET-CARDS-TO-LEARN":
            return {
                ...state,
                cards: action.cards
            }
        case "LEARN-CARDS-REDUCER/SET-IS-FETCHING-LEARN-PAGE":
            return {
                ...state,
                isFetchingLearnPage: action.fetching
            }
        case "LEARN-CARDS-REDUCER/SET-CARD-GRADE":
            return {
                ...state,
                cards: state.cards.map(el => el._id === action.cardId ? {...el, grade: action.grade} : el)
            }
        default:
            return state
    }
}

type SetCardsToLearnAT = ReturnType<typeof setCardsToLearnAC>
const setCardsToLearnAC = (cards: Cards[]) => {
    return {
        type: "LEARN-CARDS-REDUCER/SET-CARDS-TO-LEARN",
        cards
    } as const
}

type SetIsFetchingLearnPageAT = ReturnType<typeof setIsFetchingLearnPageAC>
const setIsFetchingLearnPageAC = (fetching: boolean) => {
    return {
        type: "LEARN-CARDS-REDUCER/SET-IS-FETCHING-LEARN-PAGE",
        fetching,
    } as const
}

type SetCardGradeAT = ReturnType<typeof setCardGradeAC>
const setCardGradeAC = (cardId: string, grade: number) => {
    return {
        type: "LEARN-CARDS-REDUCER/SET-CARD-GRADE",
        cardId,
        grade
    } as const
}

//THUNK

export const setCardsToLearnT = (cardsPackId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingLearnPageAC(true))
        const res = await cardsApi.getCards(cardsPackId, 100, 1)

        dispatch(setCardsToLearnAC(res.data.cards))

    } catch (e) {

    } finally {
        dispatch(setIsFetchingLearnPageAC(false))
    }
}

export const sendCardGradeT = (grade: number, cardId: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setIsFetchingLearnPageAC(true))
        const res = await cardsApi.updateGrade(grade, cardId)

        dispatch(setCardGradeAC(cardId, grade))

    } catch (e) {

    } finally {
        dispatch(setIsFetchingLearnPageAC(false))
    }
}
