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
import { RouteComponentProps } from "react-router";

interface Props {
    user: User;
    history: RouteComponentProps["history"];
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

export default function UserCard({ user, history }: Props) {
    const classes = useStyles();

    return (
        <Card className={classes.card}>
            <CardActionArea>
                {user.avatar && <CardMedia onClick={() => history.push(`/user/${user.id}`)} className={classes.media} image={user.avatar.url} />}
                <CardContent onClick={() => history.push(`/user/${user.id}`)}>
                    <Typography variant="h4" component="h2">
                    {user.name}'s Wardrobe
                    </Typography>
                    <Typography gutterBottom variant="subtitle1" component="h3">
                        {user.location.city}, {user.location.country}
                    </Typography>
                </CardContent>
                <div style={{ display: "flex", overflowX: "scroll" }}>
                    {user.clothings.map(c => (
                        <Link to={`/clothing/${c.id}`}>
                            <div key={c.id}>
                                <img src={c.image.previewUrl} alt="" />
                            </div>
                        </Link>
                    ))}
                </div>
            </CardActionArea>
            <CardActions>
                <Link to={`/user/${user.id}`}>
                    <Button color="primary">More</Button>
                </Link>
            </CardActions>
        </Card>
    );
}
