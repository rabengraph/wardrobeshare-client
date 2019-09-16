import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Menu, { MenuProps } from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { RouteComponentProps } from "react-router";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import FilterListIcon from "@material-ui/icons/FilterList";

const StyledMenu = withStyles({
    paper: {
        border: "1px solid #d3d4d5",
    },
})((props: MenuProps) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
        }}
        transformOrigin={{
            vertical: "top",
            horizontal: "left",
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        "&:focus": {
            backgroundColor: theme.palette.primary.main,
            "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

interface Props {
    open: boolean;
    anchorEl: null | HTMLElement;
    handleClose: () => void;
    history: RouteComponentProps["history"];
}
export default function MainMenu({ anchorEl, open, handleClose, history }: Props) {
    return (
        <div>
            <StyledMenu id="customized-menu" anchorEl={anchorEl} keepMounted open={open} onClose={handleClose}>
                <StyledMenuItem onClick={() => history.push("/")}>
                    <ListItemIcon>
                        <SupervisorAccountIcon />
                    </ListItemIcon>
                    <ListItemText primary="Users" />
                </StyledMenuItem>
                <StyledMenuItem onClick={() => history.push("/clothingsfilter")}>
                    <ListItemIcon>
                        <FilterListIcon />
                    </ListItemIcon>
                    <ListItemText primary="Clothings Filter" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
