import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import {AppStateType} from "../../bll/b2-store/store";
import {Cards, createCardTC, setCardsTC} from "../../bll/b1-reducers/r5-cards/cards-reducer";
import {CardsList} from "./CardsList";
import styles from "./CardsPage.module.scss"
import {CardPagination} from "./Pagination/CardsPagination";
import {Button} from "@mui/material";
// import SelectVariants from "./Select/CardsSelect";

export const CardsPage = () => {
    const dispatch = useDispatch()
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const cards = useSelector<AppStateType, Array<Cards>>((state) => state.cards.cards)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const {id} = useParams()
    useEffect(() => {
        if (isAuthorized) {
            if (id) {
                dispatch(setCardsTC(id))
            }
        }
    }, [isAuthorized, pageCount, page])

    const addCardBtn = () => {
        if (id) {
            dispatch(createCardTC(id, "How are you?", " i'm fine"))
        }
    }
    return (
        <div className={styles.cardsPage}>
            <h2>Pack name</h2>
            <div className={styles.block}>
                <Button variant="contained" onClick={addCardBtn}>Add new card</Button>
            </div>
            {cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
            <CardPagination/>
            {/*<SelectVariants/>*/}
        </div>
    )
}
