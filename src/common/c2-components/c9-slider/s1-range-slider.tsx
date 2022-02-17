import React from "react"
import styles from "./s1-range-slider.module.scss"
import Slider from "@mui/material/Slider";

type RangeSliderPropsType = {
    minMax: number[]
}

export const RangeSlider = ({minMax}: RangeSliderPropsType) => {

    const [value, setValue] = React.useState<number[]>(minMax);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
    };

    return(
        <div className={styles.container}>
            <Slider
                value={value}
                onChange={handleChange}
                valueLabelDisplay="on"
                sx={{color: "#45007A"}}
            />
        </div>
    )
}