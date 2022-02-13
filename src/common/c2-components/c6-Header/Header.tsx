import React from "react";
import {Navigation} from "../c7-Navigation/Navigation";
import styles from "./Header.module.scss"
import {CustomButton} from "../c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../components/bll/b2-store/store";
import {logoutUserT} from "../../../components/bll/b1-reducers/app/app-reducer";

export const Header = () => {
    const dispatch = useDispatch()
    const isLoggedIn = useSelector<AppStateType, boolean>((state => state.login.isLoggedIn))

    const logout = () => {
        dispatch(logoutUserT())
    }

    return (
        <div className={styles.container}>

            <div>
                <Navigation/>
            </div>

            <div>
                {
                    isLoggedIn && <CustomButton onClick={logout}>
                        Logout
                    </CustomButton>
                }
            </div>
        </div>
    )
}