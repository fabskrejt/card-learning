import {useDispatch, useSelector} from "react-redux";
import React, {useEffect, useState} from "react";
import {Navigate, useParams} from "react-router-dom";
import {AppStateType} from "../../bll/b2-store/store";
import {Cards, setCardsTC} from "../../bll/b1-reducers/r5-cards/cards-reducer";
import {CardsList} from "./CardsList";
import styles from "./CardsPage.module.scss"
import {CardPagination} from "./Pagination/CardsPagination";
import {CustomButton} from "../../../common/c2-components/c2-CustomButton/CustomButton";
import {Preloader} from "../../../common/c2-components/c4-Preloader/Preloader";
import {CardSelect} from "./Select/CardsSelect";
import {AddCardModal} from "./p1-card-add-modal/add-card-modal";

export const CardsPage = () => {
    const dispatch = useDispatch()
    const isCardsFetch = useSelector<AppStateType, boolean>((state) => state.cards.isFetching)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const cards = useSelector<AppStateType, Array<Cards>>((state) => state.cards.cards)
    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const userId = useSelector<AppStateType, string>((state) => state.login.userData._id)
    const packUserId = useSelector<AppStateType, string>((state) => state.cards.packUserId)
    const sortCards = useSelector<AppStateType, string>((state) => state.cards.sortCards)
    const {id} = useParams()
    const [wantToAdd, setWantToAdd] = useState(false)

    const openModal = () => {
        setWantToAdd(true)
    }
    const closeModal = () => {
        setWantToAdd(false)
    }


    useEffect(() => {
        if (id) {
            dispatch(setCardsTC(id))
        }
    }, [pageCount, page, sortCards])


    if (!isLoggedIn) {
        return <Navigate to={"/login"}/>
    }
    return (
        <div className={styles.cardsPage}>
            <h2>Pack</h2>
            <div className={styles.block}>

                {wantToAdd && <AddCardModal closeModal={closeModal}/>}

                {userId === packUserId &&
                <CustomButton onClick={openModal}>
                    Create Card
                </CustomButton>
                }
            </div>
            {isCardsFetch ? <Preloader/> : cards.length !== 0 ? <CardsList cards={cards}/> : <div>Not cards</div>}
            <div className={styles.pagSelectBlock}>
                <CardPagination/>
                <div className={styles.selectWrapper}><span>Show</span> <CardSelect/> Cards per Page</div>
            </div>
        </div>
    )
}
