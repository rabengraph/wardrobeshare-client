import React, { useRef, useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router";
import MenuIcon from "@material-ui/icons/Menu";
import MainMenu from "./components/MainMenu";
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
    const refMenuButton = useRef<HTMLElement | null>(null);
    const classes = useStyles();
    const [menuOpen, setMenuOpen] = useState(false);
    function handleMenuClose() {
        setMenuOpen(false);
    }
    return (
        <div className={classes.root}>
            <AppBar position="static" ref={refMenuButton}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setMenuOpen(s => !s)}>
                        <MenuIcon />
                    </IconButton>
                    <MainMenu history={history} anchorEl={refMenuButton.current} open={menuOpen} handleClose={handleMenuClose} />
                    <Typography
                        onClick={() => {
                            history.push("/");
                        }}
                        variant="h6"
                        className={classes.title}
                    >
                        Sharobe
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}
