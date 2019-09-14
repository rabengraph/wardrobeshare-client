import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function LoadingFull() {
    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', height: '100vh', width: '100vw' }}>
            <CircularProgress />
        </div>
    );
}
