import Pagination from "@mui/material/Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {setCardsPage} from "../../../bll/b1-reducers/r5-cards/cards-reducer";


export const CardPagination = () => {
    const dispatch = useDispatch()
    const cardsTotalCount = useSelector<AppStateType, number>((state) => state.cards.cardsTotalCount)
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    const page = useSelector<AppStateType, number>((state) => state.cards.page)
    const paginationNumber = Math.ceil(cardsTotalCount / pageCount)

    let pageArr = []
    if (pageCount < cardsTotalCount) {
        for (let i = 1; i <= cardsTotalCount / pageCount; i++) {
            pageArr.push(i)
        }
    } else {
        pageArr.push(1)
    }

    const onClickPage = (event: React.ChangeEvent<unknown>, value: number) => {
        dispatch(setCardsPage(value))
    }

    return (
        <div className={"pagination"}>
            <Pagination count={paginationNumber} page={page} onChange={onClickPage}/>
        </div>
    )
}
