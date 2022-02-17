import React from "react"
import ButtonGroup from "@mui/material/ButtonGroup"
import Button from "@mui/material/Button"

type CustomButtonGroupPropsType = {
    buttonsName: string[]
}

export const CustomButtonGroup = ({buttonsName}: CustomButtonGroupPropsType) => {

    const style = {
        border: "2px solid #45007A",
        color: "black",
        "&:hover": {
            border: "2px solid #45007A",
            backGroundColor: "#45007A"
        }
    }

    const buttons = buttonsName.map((el, index) => {
        return (
            <Button key={index}
                    sx={style}
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