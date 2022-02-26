import React from "react"
import styles from "./s1-range-slider.module.scss"
import Slider from "@mui/material/Slider";

type RangeSliderPropsType = {
    minMax: number[]
    minMaxCallback: any
}

export const RangeSlider = ({minMax, minMaxCallback}: RangeSliderPropsType) => {

    const [value, setValue] = React.useState<number[]>(minMax);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    const minMaxHandle = () => {
        minMaxCallback(value[0], value[1])
    }


    return(
        <div className={styles.container}>
            <Slider
                value={value}
                min={0}
                max={200}
                onMouseUp={minMaxHandle}
                onChange={handleChange}
                valueLabelDisplay="on"
                sx={{color: "#45007A"}}
            />
        </div>
    )
}