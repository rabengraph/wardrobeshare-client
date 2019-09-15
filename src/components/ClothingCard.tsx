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
import Grid from "@material-ui/core/Grid";

interface Props {
    clothing: Clothing;
}
const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        marginBottom: "40px",
    },
    media: {
        height: 300,

        // height: 0,
        // paddingTop: "56.25%", // 16:9
    },
    actions: {
        padding: "30px 10px",
    },
});

export default function ClothingCard({ clothing }: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardHeader title={clothing.name} />
            <Grid container spacing={2}>
                <Grid xs={6} item>
                    <Link to={`/clothing/${clothing.id}`}>
                        <CardMedia className={classes.media} image={clothing.image.url} />
                    </Link>
                </Grid>
                <Grid xs={6} item>
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {clothing.description}
                        </Typography>
                    </CardContent>
                </Grid>
                <ClothingSpecsTable clothing={clothing} />
            </Grid>

            <CardActions className={classes.actions}>
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
