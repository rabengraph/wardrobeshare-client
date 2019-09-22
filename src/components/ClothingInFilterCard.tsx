import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Clothing, User } from "../types";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ClothingSpecsTable from "./ClothingSpecsTable";
import Fab from "@material-ui/core/Fab";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import HomeIcon from "@material-ui/icons/Home";
import { RouteComponentProps } from "react-router";
import AvatarTitle from "./AvatarTitle";
import ColorPoint from "./ColorPoint";
import Chip from "@material-ui/core/Chip";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
interface Props {
    clothing: Clothing;
    history: RouteComponentProps["history"];
}
const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        // marginBottom: "40px",
    },
    chip: {
        margin: "2px",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
    avatar: {
        margin: 10,
        width: 60,
        height: 60,
    },
    bottomRightButtons: {
        marginLeft: "auto",
        marginRight: 0,
    },
    cardHeader: {
        cursor: "pointer",
    },
});

export default function ClothingInFilterCard({ clothing, history }: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader
                className={classes.cardHeader}
                onClick={() => (clothing.person ? history.push(`/user/${clothing.person.id}`) : null)}
                title={clothing.person ? <AvatarTitle person={clothing.person} /> : ""}
                avatar={clothing.person ? <Avatar alt="" src={clothing.person.avatar.previewUrl} className={classes.avatar} /> : null}
            />
            <CardContent>
                <Typography variant="h4" component="h1">
                    {clothing.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {clothing.manufacturer.name}
                </Typography>
                <Typography variant="h5" component="h2">
                    {clothing.cultures.map(c => (
                        <Chip key={c.id} label={c.name} className={classes.chip} />
                    ))}
                </Typography>
                <div>
                    {clothing.colors.map(c => (
                        <ColorPoint key={c.id} color={c.hex} />
                    ))}
                </div>
                <img style={{ display: "block", height: "auto", maxWidth: "100%" }} src={clothing.image.url} />
                <Typography variant="body2" color="textSecondary" component="p">
                    {clothing.description}
                </Typography>
                <ClothingSpecsTable clothing={clothing} />
                <List>
                    {clothing.eventsWorn.map(c => (
                        <ListItem key={c.id}>
                            <ListItemAvatar>
                                <Avatar
                                    alt=""
                                    src={c.person.avatar.previewUrl}
                                    className={classes.avatar}
                                    onClick={() => {
                                        history.push(`/user/${c.person.id}`);
                                    }}
                                />
                            </ListItemAvatar>
                            <ListItemText primary={c.occasion.name} secondary={c.date} />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
            <CardActions disableSpacing>
                <Fab variant="extended" color="primary" aria-label="add" onClick={() => history.push(`/clothing/${clothing.id}`)}>
                    <ShoppingCartIcon />
                    Rent for $ {clothing.price}
                </Fab>
            </CardActions>
        </Card>
    );
}
