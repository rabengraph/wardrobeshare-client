import React from "react";

interface Props {
     color: string
}

export default function ColorPoint({ color }: Props) {
    return <div style={{ display: 'inline-block', padding: '3px', backgroundColor: color, borderRadius: 100, width: "24px", height: "24px" }}></div>;
}
