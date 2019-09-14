import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Clothing } from "../types";

interface Props {
    clothing: Clothing;
}
const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            marginTop: theme.spacing(3),
            overflowX: "auto",
        },
        table: {
            // minWidth: 650,
        },
    }),
);

export default function ClothingSpecsTable({ clothing: { size, bust, waist, hips } }: Props) {
    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Size</TableCell>
                        <TableCell align="right">Bust</TableCell>
                        <TableCell align="right">Waist</TableCell>
                        <TableCell align="right">Hips</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell component="th" scope="row">
                            {size}
                        </TableCell>
                        <TableCell align="right">{bust}</TableCell>
                        <TableCell align="right">{waist}</TableCell>
                        <TableCell align="right">{hips}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </Paper>
    );
}
