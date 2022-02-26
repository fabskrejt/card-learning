import * as React from "react";
import FormControl from "@mui/material/FormControl";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {setCardsPageCount} from "../../../bll/b1-reducers/r5-cards/cards-reducer";
import NativeSelect from "@mui/material/NativeSelect/NativeSelect";
import Box from "@mui/material/Box/Box";

export function CardSelect() {
    const dispatch = useDispatch()
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        dispatch(setCardsPageCount(Number(event.target.value)))
    };

    return (
        <Box sx={{minWidth: 50}}>
            <FormControl>
                <NativeSelect
                    onChange={handleChange} defaultValue={pageCount}>

                    <option value={4}>4</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                </NativeSelect>
            </FormControl>
        </Box>
    );
}