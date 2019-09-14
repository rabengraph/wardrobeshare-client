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
                    <Typography gutterBottom variant="h5" component="h2">
                        {user.name}
                    </Typography>
                    <div style={{ display: "flex" }}>
                        {user.clothings.map(c => (
                            <div>
                                <img src={c.image.previewUrl} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </CardActionArea>
            <CardActions>
                <Button size="small" color="primary">
                    Share
                </Button>
                <Button size="small" color="primary">
                    Learn More
                </Button>
            </CardActions>
        </Card>
    );
}
