import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router";

interface Props {
    history: RouteComponentProps["history"];
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            cursor: "pointer",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default function MenuAppBar({ history }: Props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        onClick={() => {
                            history.push("/");
                        }}
                        variant="h6"
                        className={classes.title}
                    >
                        Shecon
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
