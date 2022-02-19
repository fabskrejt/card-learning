import React, {ChangeEvent, useState} from "react"
import Pagination from "@mui/material/Pagination"

type PaginatorPropsType = {
    currentPage: number
    totalCount: number
    pageCount: number
    setPageCallback: (page: number) => void
}

export const Paginator = ({totalCount, pageCount, currentPage, setPageCallback}: PaginatorPropsType) => {

    const [page, setPage] = useState<number>(currentPage)

    const count = Math.ceil(totalCount / pageCount)

    const onChangeHandler = (e: ChangeEvent<unknown>, value: number) => {
        setPageCallback(value)
        setPage(value)
    }

    return (
        <div>
            <Pagination
                page={page}
                count={!count ? 1 : count}
                onChange={onChangeHandler}
            />
        </div>
    )
}