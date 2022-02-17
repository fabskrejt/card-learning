import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import { AppStateType } from "../../bll/b2-store/store";


export const CardsPage = () => {
    const dispatch = useDispatch()
   // const cards = useSelector<AppStateType, Array<CardType>>((state)=>state.cards)
    const isAuthorized = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const {id} = useParams()
    useEffect(() => {
        if(isAuthorized){
            if (id) {
               // dispatch(getCards(id))
            }
        }
    }, [isAuthorized])
    return (
        <div>
            Cards
            {/*{cards.length !==0? <CardsList cards={cards}/>: <div>Not cards</div> }*/}
        </div>
    )
}