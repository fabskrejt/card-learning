import React from "react";
import {Alert, AlertColor, Snackbar, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../components/bll/b2-store/store";
import {
    deletePopupMessageAC,
    PopupMessageType,
    setPopupMessageAC
} from "../../../components/bll/b1-reducers/app/app-reducer";
//import {setErrorAC} from "../../../components/bll/b1-reducers/app/app-reducer";

type CustomLinkPropsType = {
    address: string
    text: string
}

type  StatusType = 'success' | 'failed'
export const handleActionStatus = (status: StatusType, error: string = '') => {

}

type SnackBarPropsType = {
    type: 'error' | 'success',

}
export const SnackBar = (props: any) => {
    // const error = useSelector<AppStateType, string>((state) => state.app.error)
    // const success = useSelector<AppStateType, string>((state => state.app.success))

    const popupMessages = useSelector<AppStateType, PopupMessageType[]>((state => state.app.popupMessages))
    const dispatch = useDispatch()

    //const popupValue =  popupMessage.error !== '' ? popupMessage.error: popupMessage.success

    /*    let typePopup: AlertColor = 'error'
        let popupValue = ''

        if (popupMessage.error !== '') {
            typePopup = 'error'
            popupValue = popupMessage.error
        } else if (popupMessage.success !== '') {
            typePopup = 'success'
            popupValue = popupMessage.success
        }*/
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        debugger
        //dispatch(setErrorAC(''))
        //typePopup = 'error'
        //@ts-ignore
        const newPopupArr = popupMessages.filter((i)=>i.message !== event.currentTarget.id)
        dispatch(deletePopupMessageAC(newPopupArr))
        //dispatch(setPopupMessageAC({error: '', success: ''}))
    };

    const res = popupMessages.map(i =><div id ={i.message} onClick={handleClose}>
        <Alert key={1} id={'12'} style={{marginTop: '15px'}} variant={'standard'} onClose={handleClose} severity={i.type}
               sx={{width: '100%'}}>
            {i.message}
        </Alert>
    </div>
    )

    return (
        <Snackbar open={popupMessages[0] !== undefined} /*autoHideDuration={6000} onClose={handleClose}*/ key={2} id={'12'}>
            <Stack sx={{width: '100%'}} spacing={2} id={'12'}
                   style={{display: "flex", flexDirection: 'column'}}
            >
                {res}
            </Stack>
        </Snackbar>
    )
}