import React, {useState} from "react"
import styles from "./packs-list.module.scss"
import {Title} from "../../../common/c2-components/c5-Title/Title";
import {PackTable} from "./p1-list/pack-table";
import {Setting} from "./p2-setting-container/setting";
import {PackSearch} from "./p3-pack-search/pack-search";
import {PackPaginator} from "./p4-packs-list-paginator/pack-paginator";
import {AddPack} from "./p6-add-pack/add-pack";
import {useSelector} from "react-redux";
import {AppStateType} from "../../bll/b2-store/store";
import { Navigate } from "react-router-dom";


export const PacksList = () => {

    const isLoggedIn = useSelector<AppStateType, boolean>(state => state.login.isLoggedIn)
    const [addPack, setAddPack] = useState(false)

    const openAddPack = () => {
        setAddPack(true)
    }
    const closeAddPack = () => {
        setAddPack(false)
    }

    if(!isLoggedIn){
        return <Navigate to={"/login"}/>
    }

    return (
        <div>

            {addPack && <AddPack closeModal={closeAddPack}/>}

            <div className={styles.packsContainer}>
                <div className={styles.filterContainer}>
                    <Setting/>
                </div>
                <div className={styles.listContainer}>

                    <div>
                        <Title text={"Packs List"}/>
                    </div>

                    <PackSearch openCreteWindow={openAddPack}/>

                    <div className={styles.tableContainer}>
                        <PackTable/>
                    </div>

                    <PackPaginator/>

                </div>
            </div>
        </div>

    )
}

