import React from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"

type CustomButtonGroupPropsType = {
    buttonsName: string[]
    selectedBtn: string
    selectCallback: (val: string) => void
}

export const CustomButtonGroup = ({buttonsName, selectedBtn, selectCallback}: CustomButtonGroupPropsType) => {

    const style = {
        border: "2px solid #45007A",
        color: "black",
        "&:hover": {
            border: "none",
            backgroundColor: "#45007A",
            color: "white"
        }
    }
    const selectedStyle = {
        border: "2px solid #45007A",
        backgroundColor: "#45007A",
        color: "white",
        "&:hover": {
            border: "none",
            backgroundColor: "#45007A",
            color: "white"
        }
    }

    const buttons = buttonsName.map((el, index) => {

        return (
            <Button
                key={index}
                sx={selectedBtn === el ? selectedStyle : style}
                onClick={() => selectCallback(el)}
            >
                {el}
            </Button>)
    })

    return (
        <div>
            <ButtonGroup>
                {buttons}
            </ButtonGroup>
        </div>
    )
}