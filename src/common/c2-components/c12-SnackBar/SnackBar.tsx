import React from "react";
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../components/bll/b2-store/store";
import {deletePopupMessageAC, PopupMessageType} from "../../../components/bll/b1-reducers/app/app-reducer";


export const SnackBar = () => {

    const popupMessages = useSelector<AppStateType, PopupMessageType[]>((state => state.app.popupMessages))
    const dispatch = useDispatch()

    const handleClose = (event?: React.SyntheticEvent | Event | React.MouseEvent<HTMLDivElement, MouseEvent>, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        debugger
       if(event !==null && event !== undefined ){
           //@ts-ignore
           const newPopupArr = popupMessages.filter((i) => i.message !== event.currentTarget.id)
           dispatch(deletePopupMessageAC(newPopupArr))
       }
    }

    const res = popupMessages.map(i => <div key={i.message} id={i.message} onClick={handleClose}
                                            style={{width: '300px', wordBreak: 'break-all'}}>
            <Snackbar open={popupMessages[0] !== undefined} autoHideDuration={3000} onClose={handleClose}
                      style={{
                          position: "relative",
                          bottom: "24px",
                          left: "24px",
                          right: "auto"
                      }}>
                <Alert style={{marginTop: '15px'}} variant={'standard'} onClose={handleClose} severity={i.type}
                       sx={{width: '100%'}}>
                    {i.message}
                </Alert>
            </Snackbar>
        </div>
    )

    return (
        <div style={
            {
                display: "flex",
                flexDirection: 'column',
                position: 'absolute',
                bottom: "15px",
                left: "24px",
                right: "auto"
            }
        }>
            {res}
        </div>
    )
}
