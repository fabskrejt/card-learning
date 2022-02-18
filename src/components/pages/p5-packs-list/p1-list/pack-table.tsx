import React, {useEffect} from "react"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import {CustomButton} from "../../../../common/c2-components/c2-CustomButton/CustomButton";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {CardPacks, setCardPacksTC} from "../../../bll/b1-reducers/r4-packs/packs-reducer";
import {setCards, setCardsTC} from "../../../bll/b1-reducers/r5-cards/cards-reducer";



const createList = (
        name: string,
        cardsNumber: number,
        lastUpdate: string,
        createdBy: string,
) => {
    return {name, cardsNumber, lastUpdate, createdBy}
}

const rows = [
    createList('Pack ', 10, "10.08.2021", "Leonid"),
    createList('Pack nme', 150, "10.08.2021", "Alex"),
    createList('Packname', 9, "10.08.2021", "Max"),
    createList('Pak name', 40, "10.08.2021", "Serg")
]

export const PackTable = () => {
    const cardsPack = useSelector<AppStateType, any>((state)=>state.packs.cardPacks)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(setCardPacksTC())
    },[])
    return(
        <div>
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
                       {cardsPack.map((row:CardPacks, index:number) => (
                           <TableRow
                               key={index}
                               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                           >
                               <TableCell component="th" scope="row">
                                   {row.name}
                               </TableCell>

                               <TableCell align="right">{row.user_name}</TableCell>
                               <TableCell align="right">{row.updated}</TableCell>
                               <TableCell align="right">{row.user_name}</TableCell>
                               <TableCell align="right">
                                   <CustomButton>del</CustomButton>
                               </TableCell>
                           </TableRow>
                       ))}
                   </TableBody>
               </Table>
           </TableContainer>
        </div>
    )
}