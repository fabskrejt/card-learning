import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../bll/b2-store/store";
import {setCardsPageCount, SetCardsPageCountAT} from "../../../bll/b1-reducers/r5-cards/cards-reducer";

export default function SelectVariants() {
    const dispatch = useDispatch()
    const pageCount = useSelector<AppStateType, number>((state) => state.cards.pageCount)
    //const [age, setAge] = React.useState<number>(pageCount);

    const handleChange = (event: SelectChangeEvent) => {
        dispatch(setCardsPageCount(Number(event.target.value)))
    };

    return (
        <div>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 50 }}>
                <InputLabel id="demo-simple-select-standard-label">{pageCount}</InputLabel>
                <Select
                    labelId="demo-simple-select-standard-label"
                    id="demo-simple-select-standard"
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={1}>10</MenuItem>
                    <MenuItem value={20}>20</MenuItem>
                    <MenuItem value={30}>30</MenuItem>
                </Select>
            </FormControl>

        </div>
    );
}