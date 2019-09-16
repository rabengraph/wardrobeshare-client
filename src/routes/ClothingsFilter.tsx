import React, { useState } from "react";
import { Clothing } from "../types";
import ClothingCard from "../components/ClothingCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import Loading from "../components/Loading";
import { RouteComponentProps } from "react-router";
import Drawer from "@material-ui/core/Drawer";
import FilterListIcon from "@material-ui/icons/FilterList";
import Fab from "@material-ui/core/Fab";
import { makeStyles, useTheme, Theme, createStyles } from "@material-ui/core/styles";
import StyledSlider from "../components/StyledSlider";
import Typography from "@material-ui/core/Typography";
import queryString from "query-string";

const MAX_PRICE = 200;

const GET_CLOTHINGS = gql`
    query clothings($querystring: String) {
        clothings(querystring: $querystring) @rest(type: "Clothings", path: "clothings?{args.querystring}") {
            id
            name
            image
            size
            bust
            waist
            hips
            description
            price
            person
            color
            manufacturer
        }
    }
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        filterControls: {
            padding: "10px",
        },
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    }),
);
export default function ClothingsFilter({ history }: RouteComponentProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);

    const query = {
        "price[between]": `${priceRange[0]}..${priceRange[1]}`,
    };

    console.log("query", query);

    const { loading, error, data } = useQuery(GET_CLOTHINGS, {
        variables: { querystring: queryString.stringify(query, { arrayFormat: "bracket" }) },
    });
    const clothings = data ? (data.clothings as Clothing[]) : [];
    const [controlsVisible, setControlsVisible] = useState(false);

    const classes = useStyles();

    // if (loading) return <LoadingFull />;
    if (error) return <p>Error :(</p>;

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === "keydown" && ((event as React.KeyboardEvent).key === "Tab" || (event as React.KeyboardEvent).key === "Shift")) {
            return;
        }
        setControlsVisible(open);
    };

    function handlePriceRangeChange(v: number | number[]) {
        if (typeof v === "object") {
            if (v.length === 2) {
                setPriceRange(v as [number, number]);
            }
        }
    }

    // queryString.stringify({foo: [1, 2, 3]}, {arrayFormat: 'bracket'});

    return (
        <>
            <Drawer anchor="bottom" open={controlsVisible} onClose={toggleDrawer(false)}>
                <div className={classes.filterControls}>
                    <Typography gutterBottom>Price</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={0}
                        max={MAX_PRICE}
                        step={10}
                        value={priceRange}
                        onChangeCommitted={(e, newValues) => handlePriceRangeChange(newValues)}
                    />
                </div>
            </Drawer>
            {loading && <Loading />}
            {clothings.map(c => (
                <ClothingCard key={c.id} clothing={c} />
            ))}
            {!controlsVisible && (
                <Fab aria-label="Filter" className={classes.fab} color="primary" onClick={() => setControlsVisible(true)}>
                    <FilterListIcon />
                </Fab>
            )}
        </>
    );
}
