import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Clothing } from "../types";
import { Link } from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import ClothingSpecsTable from "./ClothingSpecsTable";
import Fab from "@material-ui/core/Fab";

interface Props {
    clothing: Clothing;
}
const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        // marginBottom: "40px",
    },
    media: {
        height: 0,
        paddingTop: "56.25%", // 16:9
    },
});

export default function ClothingCard({ clothing }: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader title={clothing.name} />
            <CardMedia className={classes.media} image={clothing.image.url} />
            <CardContent>
                <Typography variant="body2" color="textSecondary" component="p">
                    {clothing.description}
                </Typography>
                <ClothingSpecsTable clothing={clothing} />
            </CardContent>
            <CardActions disableSpacing>
                <Link to={`/clothing/${clothing.id}`}>
                    <Fab variant="extended" color="primary" aria-label="add">
                        <ShoppingCartIcon />
                        Rent for $ {clothing.price}
                    </Fab>
                </Link>
            </CardActions>
        </Card>
    );
}
