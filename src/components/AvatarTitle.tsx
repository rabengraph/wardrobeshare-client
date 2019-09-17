import React from "react";
import Typography from "@material-ui/core/Typography";
import { User } from "../types";
import Rating from "@material-ui/lab/Rating";

export default function AvatarTitle({ person }: { person: User }) {
    return (
        <>
            <Rating value={person.rating} readOnly={true} />
            <Typography>
                {person.name}
            </Typography>
            <Typography>
               {person.location.city}, {person.location.country}
            </Typography>
        </>
    );
}
