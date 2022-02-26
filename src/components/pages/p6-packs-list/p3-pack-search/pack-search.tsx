import React, {useState} from "react"
import styles from "./pack-search.module.scss";
import {CustomInput} from "../../../../common/c2-components/c1-CustomInput/CustomInput";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch} from "react-redux";
import {setPackNameForSearch} from "../../../bll/b1-reducers/r4-packs/packs-reducer";

type PackSearchPropsType = {
    openCreteWindow: () => void
}

export const PackSearch = ({openCreteWindow}: PackSearchPropsType) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState("")

    const changeValue = (value: string) => {
        setValue(value)
    }

    const search = () => {
        dispatch(setPackNameForSearch(value))
    }

    const openCreate = () => {
        openCreteWindow()
    }

    return (
        <div className={styles.searchContainer}>
            <CustomInput
                value={value}
                onChangeText={changeValue}
                onEnter={search}
            />
            <CustomButton onClick={search}>
                Search
            </CustomButton>
            <CustomButton onClick={openCreate}>
                Create
            </CustomButton>
        </div>
    )
}