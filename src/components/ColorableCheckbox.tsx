import React from "react";
import { makeStyles } from "@material-ui/styles";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";

interface Props extends CheckboxProps {
    hexColor: string;
}
const useStyles = makeStyles({
    // style rule
    root: (props: { hexColor: string }) => ({
        backgroundColor: props.hexColor,
    }),
});

export default function ColorableCheckbox({ hexColor, ...rest }: Props) {
    const classes = useStyles({ hexColor });

    return <Checkbox className={classes.root} {...rest} />;
}
