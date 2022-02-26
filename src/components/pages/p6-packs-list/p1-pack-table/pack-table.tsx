import React, {useEffect, useState} from "react"
import styles from "./pack-table.module.scss"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {CardPacks, deletePackTC, setCardPacksTC, setSortPacks} from "../../../bll/b1-reducers/r4-packs/packs-reducer";
import {EditModalWindow} from "../p7-edit-modal-window/edit-modal-window";
import {Preloader} from "../../../../common/c2-components/c4-Preloader/Preloader";
import {Link} from "react-router-dom";
import {CustomLink} from "../../../../common/c2-components/c11-CustomLink/custom-link";


export const PackTable = () => {

    const dispatch = useDispatch()
    const isPacksFetch = useSelector<AppStateType, boolean>(state => state.packs.isFetching)
    const showAll = useSelector<AppStateType, boolean>(state => state.packs.showAllPacks)
    const minCards = useSelector<AppStateType, number>(state => state.packs.settings.minCardsCount)
    const maxCards = useSelector<AppStateType, number>(state => state.packs.settings.maxCardsCount)
    const currentPage = useSelector<AppStateType, number>(state => state.packs.settings.page)
    const userId = useSelector<AppStateType>(state => state.login.userData._id)
    const packs = useSelector<AppStateType, CardPacks[]>(state => state.packs.cardPacks)
    const packForSearch = useSelector<AppStateType, string>(state => state.packs.settings.packNameForSearch)
    const sortPacksSetting = useSelector<AppStateType, string>(state => state.packs.settings.sortPacks)

    const [editCardId, setEditCardId] = useState("")

    //SortTable
    const [nameSort, setNameSort] = useState(false)
    const [cardsSort, setCardsSort] = useState(false)
    const [updateSort, setUpdateSort] = useState(false)
    const [userNameSort, setUserNameSort] = useState(false)


    const EditModeOff = () => {
        setEditCardId("")
    }
    const deletePack = (packId: string) => {
        dispatch(deletePackTC(packId))
    }
    const sortPacks = (sortType: string) => {
        dispatch(setSortPacks(sortType))
    }


    useEffect(() => {
        dispatch(setCardPacksTC())
    }, [dispatch, currentPage, showAll, minCards, maxCards, sortPacksSetting, packForSearch])


    const tableBody = packs.map(el => {

        const changeEditId = () => {
            setEditCardId(el._id)
        }

        return (
            <TableRow
                key={el._id}
                sx={{"&:last-child td, &:last-child th": {border: 0}}}
            >
                <TableCell component="th" scope="row">
                    <Link to={`/cards/${el._id}`}>
                        {el.name}
                    </Link>
                </TableCell>
                <TableCell align="right">{el.cardsCount}</TableCell>
                <TableCell align="right">{el.updated}</TableCell>
                <TableCell align="right">{el.user_name}</TableCell>

                {userId === el.user_id
                    ?
                    <TableCell align="right"
                               sx={{
                                   display: "flex",
                               }}>
                        {/*Edit Window*/}
                        {editCardId === el._id &&
                        <EditModalWindow
                            packId={el._id}
                            closeWindow={EditModeOff}
                        />
                        }
                        <div className={styles.linkBtn}>
                            <CustomLink text={"learn"} address={`/learn/${el._id}`}/>
                        </div>

                        <CustomButton
                            onClick={() => deletePack(el._id)}
                        >
                            delete
                        </CustomButton>
                        <CustomButton
                            onClick={changeEditId}
                        >
                            edit
                        </CustomButton>

                    </TableCell>
                    :
                    <TableCell align="right">
                        <CustomLink text={"learn"} address={`/learn/${el._id}`}/>
                    </TableCell>
                }

            </TableRow>
        )
    })

    return (
        <div>
            {isPacksFetch && <Preloader/>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <span
                                    className={styles.spanStyle}
                                    onClick={() => {
                                        sortPacks(`${+nameSort}name`)
                                        setNameSort(!nameSort)
                                    }}
                                >
                                    Name
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={styles.spanStyle}
                                    onClick={() => {
                                        sortPacks(`${+cardsSort}cardsCount`)
                                        setCardsSort(!cardsSort)
                                    }}
                                >
                                    Cards
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={styles.spanStyle}
                                    onClick={() => {
                                        sortPacks(`${+updateSort}updated`)
                                        setUpdateSort(!updateSort)
                                    }}
                                >
                                    Last Update
                                </span>
                            </TableCell>
                            <TableCell>
                                <span
                                    className={styles.spanStyle}
                                    onClick={() => {
                                        sortPacks(`${+userNameSort}user_name`)
                                        setUserNameSort(!userNameSort)
                                    }}
                                >
                                    Created By
                                </span>
                            </TableCell>
                            <TableCell>
                                Actions
                            </TableCell>
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