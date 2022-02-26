import React, {useState} from "react";
import {Cards, deleteCardTC, setSortCardsAC} from "../../bll/b1-reducers/r5-cards/cards-reducer";
import styles from "./CardsList.module.scss";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {CustomButton} from "../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../bll/b2-store/store";
import {CardEditModal} from "./p2-edit-card-modal/edit-card-modal";

type PropsType = {
    cards: Array<Cards>
}

export const CardsList = (props: PropsType) => {
    const userId = useSelector<AppStateType, string>((state) => state.login.userData._id)

    const dispatch = useDispatch()

    const [editCardId, setEditCardId] = useState("")


    const editModeOff = () => {
        setEditCardId("")
    }

    const deleteCardBtn = (id: string) => {
        dispatch(deleteCardTC(id))
    }

    const tableBody = props.cards.map(el => {

        const editModeOn = () => {
            setEditCardId(el._id)
        }

        return (
            <TableRow
                key={el._id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    {el.question}
                </TableCell>
                <TableCell align="left">
                    {el.answer}
                </TableCell>
                <TableCell align="left">
                    {el.updated.slice(0, 10).split("-").reverse().join(".")}
                </TableCell>
                <TableCell align="left">{el.rating}</TableCell>

                {userId === el.user_id
                    ?
                    <TableCell align="right" sx={{display: "flex"}}>
                        <CustomButton
                            onClick={() => deleteCardBtn(el._id)}
                        >
                            Delete
                        </CustomButton>
                        <CustomButton
                            onClick={editModeOn}
                        >
                            Edit
                        </CustomButton>
                        {editCardId === el._id &&
                        <CardEditModal
                            closeModal={editModeOff}
                            id={el._id}
                        />}
                    </TableCell>
                    :
                    null
                }

            </TableRow>
        )
    })
    let [sortValue, setSortValue] = useState<Array<string>>([])
    let arr: Array<string> = []
    let number = 0
    const sortCardsHandler = (value: string) => {
        if (sortValue.find(v => v === value)) {
            let newSortValue = sortValue.filter(v => v !== value)
            setSortValue(newSortValue)
            number = 0
        } else {
            let newSortValue = [...sortValue, value]
            setSortValue(newSortValue)
            number = 1
        }
        dispatch(setSortCardsAC(number + value))

    }
    return (
        <div className={styles.container}>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span className={styles.item} onClick={() => sortCardsHandler("question")}
                                >Question</span>
                            </TableCell>
                            <TableCell>
                                <span className={styles.item} onClick={() => sortCardsHandler("answer")}>
                                    Answer</span>
                            </TableCell>
                            <TableCell>
                                <span className={styles.item} onClick={() => sortCardsHandler("update")}>
                                    Last Updated</span>
                            </TableCell>
                            <TableCell>
                                <span className={styles.item} onClick={() => sortCardsHandler("grade")}>
                                    Grade</span>
                            </TableCell>
                            {userId === props.cards[0].user_id && <TableCell>Actions</TableCell>}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableBody}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}