import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../components/bll/b2-store/store";
import {setErrorAC} from "../../../components/bll/b1-reducers/app/app-reducer";

type CustomLinkPropsType = {
    address: string
    text: string
}

type  StatusType = 'success' | 'failed'
export const handleActionStatus = (status: StatusType, error: string = '') => {

}

export const SnackBar = () => {
const error = useSelector<AppStateType, string>((state)=>state.app.error)
const dispatch = useDispatch()
    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setErrorAC(''))
    };
    return (
        <Snackbar open={error !== ''} autoHideDuration={6000} >
            <Alert onClose={handleClose} severity="error" sx={{width: '100%'}}>
                {error}
            </Alert>
        </Snackbar>
    )
}