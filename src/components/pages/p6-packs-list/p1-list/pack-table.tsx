import React, {useEffect, useState} from "react"
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {CardPacks, deletePackTC, setCardPacksTC} from "../../../bll/b1-reducers/r4-packs/packs-reducer";
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

    const [editMode, setEditMode] = useState(false)

    const EditModeOn = () => {
        setEditMode(true)
    }
    const EditModeOff = () => {
        setEditMode(false)
    }
    const deletePack = (packId: string) => {
        dispatch(deletePackTC(packId))
    }


    useEffect(() => {
        dispatch(setCardPacksTC())
    }, [currentPage, showAll, minCards, maxCards])


    const tableBody = packs.map(el => (
        <TableRow
            key={el._id}
            sx={{"&:last-child td, &:last-child th": {border: 0}}}
        >
            <TableCell component="th" scope="row">
                {el.name}
            </TableCell>
            <TableCell align="right">{el.cardsCount}</TableCell>
            <TableCell align="right">{el.updated}</TableCell>
            <TableCell align="right">{el.user_name}</TableCell>

            {userId === el.user_id
                ?
                <TableCell align="right" sx={{display: "flex"}}>
                    {/*Edit Window*/}
                    {editMode &&
                    <EditModalWindow
                        packId={el._id}
                        closeWindow={EditModeOff}
                    />
                    }

                    <CustomLink
                        address={`/cards/${el._id}`}
                        text={"Learn"}
                    />
                    <CustomButton
                        onClick={() => deletePack(el._id)}
                    >
                        delete
                    </CustomButton>
                    <CustomButton
                        onClick={EditModeOn}
                    >
                        edit
                    </CustomButton>

                </TableCell>
                :
                <TableCell align="right">
                    <CustomLink
                        address={`/cards/${el._id}`}
                        text={"Learn"}
                    />
                </TableCell>
            }

        </TableRow>
    ))

    return (
        <div>
            {isPacksFetch && <Preloader/>}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Cards</TableCell>
                            <TableCell>Last Update</TableCell>
                            <TableCell>Created By</TableCell>
                            <TableCell>Actions</TableCell>
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