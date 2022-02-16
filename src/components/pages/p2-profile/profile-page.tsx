import React from "react"
import {useDispatch, useSelector} from "react-redux";
import { Navigate } from "react-router-dom";
import {AppStateType} from "../../bll/b2-store/store";
import {cardPacksApi, cardsApi} from "../../../dal/cardsApi";
import {setCardPacksTC} from "../../bll/b1-reducers/r4-packs/packs-reduser";

export const ProfilePage = () => {
    const userName = useSelector<AppStateType, string>(state => state.login.userData.name)
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))
    const dispatch = useDispatch()
    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }
    return (
        <div>
            ProfilePage
            <div>
                {userName}
            </div>
            {/*for test*/}
            <button onClick={()=>cardPacksApi.getCardPacks('',)}>getCardsPack</button>
            <button onClick={()=>cardPacksApi.createCardsPack('TestSuper', '', true)}>createCardsPack</button>
            <button onClick={()=>cardPacksApi.deleteCardsPack('620acb7c1154001dab98e247')}>deleteCardsPack</button>
            <button onClick={()=>cardPacksApi.changeCardsPackName('620aabbe1154001dab98e23d', 'Valya')}>changeCardsPackName</button>

            <button onClick={()=>cardsApi.getCards('620ac01f1154001dab98e241')}>getCard</button>
            <button onClick={()=>cardsApi.createCard('620ac01f1154001dab98e241', 'What are you?','goo11d')}>createCard</button>
            <button onClick={()=>cardsApi.deleteCard('620ac1d61154001dab98e245')}>deleteCard</button>
            <button onClick={()=>cardsApi.changeCard('620ac1d31154001dab98e244', 'How it work?', 'i hz')}>changeCard</button>
            <button onClick={()=>dispatch(setCardPacksTC('','11','9999','', 2,10))}>Thunk</button>
        </div>
    )
}