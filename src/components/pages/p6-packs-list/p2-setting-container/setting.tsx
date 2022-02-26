import React from "react"
import styles from "./setting.module.scss";
import {CustomButtonGroup} from "../../../../common/c2-components/c2-CustomButton/c1-custom-button-group";
import {RangeSlider} from "../../../../common/c2-components/c9-slider/s1-range-slider";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {setMinMaxCardsInPack, setShowAllPacks} from "../../../bll/b1-reducers/r4-packs/packs-reducer";


export const Setting = () => {

    const dispatch = useDispatch()

    const maxCardsCount = useSelector<AppStateType, number>(state => state.packs.settings.maxCardsCount)
    const minCardsCount = useSelector<AppStateType, number>(state => state.packs.settings.minCardsCount)

    const showAllPacks = useSelector<AppStateType, boolean>(state => state.packs.showAllPacks)
    //условие заливки кнопки
    const selectedBtn = showAllPacks ? "All" : "My"


    const setMinMax = (min: number, max: number) => {
        dispatch(setMinMaxCardsInPack(min, max))
    }

    const setShowAll = (val: string) => {
        let a = val === "All"
        dispatch(setShowAllPacks(a))
    }


    return (
        <>
            <div className={styles.showContainer}>
                <h5>Number of cards</h5>
                <CustomButtonGroup
                    buttonsName={["My", "All"]}
                    selectedBtn={selectedBtn}
                    selectCallback={setShowAll}
                />
            </div>

            <div className={styles.sliderContainer}>
                <h5>Number of cards</h5>
                <RangeSlider
                    minMax={[minCardsCount, maxCardsCount]}
                    minMaxCallback={setMinMax}
                />
            </div>
        </>
    )
}