import React from "react"
import styles from "./pack-paginator.module.scss";
import {Paginator} from "../../../../common/c2-components/c10-paginator/paginator";
import {setPage} from "../../../bll/b1-reducers/r4-packs/packs-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";


export const PackPaginator = () => {

    const dispatch = useDispatch()

    const currentPage = useSelector<AppStateType, number>(state => state.packs.settings.page)
    const packTotalCount = useSelector<AppStateType, number>(state => state.packs.cardPacksTotalCount)
    const pageCount = useSelector<AppStateType, number>(state => state.packs.settings.pageCount)

    const setNewPage = (page: number) => {
        dispatch(setPage(page))
    }

    return (
        <div className={styles.paginatorContainer}>

            <Paginator
                currentPage={currentPage}
                totalCount={packTotalCount}
                pageCount={pageCount}
                setPageCallback={setNewPage}
            />
        </div>
    )
}