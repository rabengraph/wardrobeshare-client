import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Loading() {
    return (
        <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
            <CircularProgress />
        </div>
    );
}
