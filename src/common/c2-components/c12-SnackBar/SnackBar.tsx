import React, {SyntheticEvent} from "react";
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../../components/bll/b2-store/store";
import {deletePopupMessageAC, PopupMessageType} from "../../../components/bll/b1-reducers/app/app-reducer";


export const SnackBar = () => {

    let popupMessages = useSelector<AppStateType, PopupMessageType[]>((state => state.app.popupMessages))
    const dispatch = useDispatch()

    const handleClose = (event?: SyntheticEvent<Element, Event>| React.SyntheticEvent | Event | React.MouseEvent<HTMLDivElement, MouseEvent>, reason?: string, id?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        debugger
        if (id) {
            const newPopupArr = popupMessages.filter((i) => i.id !== id)
            dispatch(deletePopupMessageAC(newPopupArr))
        }

    }
    // @ts-ignore
    /*    const message = popupMessages.map(i => <div  key={i.id+i.type} id={i.id} onClick={handleClose}
                                                    style={{width: '300px', wordBreak: 'break-all', transition:'10'}}>
                <div
                          style={{
                              position: "relative",
                              bottom: "24px",
                              left: "24px",
                              right: "auto"
                          }}>
                    <Snackbar title={'adasd'} open={popupMessages[0] !== undefined} autoHideDuration={3000} id={i.id} style={{position:'revert'}}  onClose={()=>handleClose(i.id)}>
                    <Alert style={{marginTop: '15px'}} variant={'standard'} onClose={handleClose} severity={i.type}
                           sx={{width: '100%'}}>
                        {i.message}
                    </Alert>
                    </Snackbar>
                </div>
            </div>
        )*/


    const message = popupMessages.map(i => <Snackbar onClose={(ev, res) => handleClose(ev, res,i.id)}
                                                     open={popupMessages[0] !== undefined} autoHideDuration={3000}
                                                     id={i.id} style={{position: 'relative'}}>

            <Alert style={{marginTop: '15px',wordBreak: 'break-all',width: '300px'}} variant={'standard'} onClose={(e) => handleClose(e,'',i.id)} severity={i.type}
                   sx={{width: '100%'}}>
                {i.message}
            </Alert>
        </Snackbar>
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
            {message}
        </div>
    )
}
