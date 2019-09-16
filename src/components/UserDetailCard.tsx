import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { User } from "../types";
import { Link } from "react-router-dom";
import ClothingCard from "./ClothingCard";

interface Props {
    user: User;
}
const useStyles = makeStyles({
    card: {
        // maxWidth: 345,
        marginBottom: "40px",
    },
    media: {
        height: 142,
    },
});

export default function MediaCard({ user }: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                {user.avatar && <CardMedia className={classes.media} image={user.avatar.url} />}
                <CardContent>
                    <Typography variant="h4" component="h2">
                        {user.name}
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h3">
                        {user.location.city}
                    </Typography>
                    <Typography gutterBottom variant="subtitle2" component="h3">
                        {user.slogan}
                    </Typography>
                    <Typography variant="subtitle2" component="h6">
                        {user.name}'s Wardrobe
                    </Typography>
                    <div>
                        {user.clothings.map(c => (
                            <ClothingCard key={c.id} clothing={c} />
                        ))}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Link to={`/`}>
                    <Button color="primary">Back</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
