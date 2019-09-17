import React, { useState } from "react";
import { Clothing, Color, Manufacturer } from "../types";
import ClothingInFilterCard from "../components/ClothingInFilterCard";
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
import Rating from "@material-ui/lab/Rating";
import ColorableCheckbox from "../components/ColorableCheckbox";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import useGeolocation from "../hooks/useGeolocation";
import { getBoundsOfDistance, convertDistance } from "geolib";

const MAX_PRICE = 200;
const MAX_DISTANCE = 10000;

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
            colors
            manufacturer
        }
    }
`;

const GET_COLORS = gql`
    query colors {
        colors @rest(type: "Colors", path: "colors/") {
            id
            name
            hex
        }
    }
`;

const GET_MANUFACTURERS = gql`
    query manufacturers {
        manufacturers @rest(type: "Colors", path: "manufacturers/") {
            id
            name
        }
    }
`;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        fab: {
            position: "fixed",
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
        drawerPaper: {
            padding: "10px",
            maxHeight: "80vh",
        },
    }),
);

function getMaxMinLngLat({
    myLatitude,
    myLongitude,
    maxDistance,
}: {
    myLatitude: null | number;
    myLongitude: null | number;
    maxDistance: number;
}): null | { lngMax: number; lngMin: number; latMax: number; latMin: number } {
    if (!myLatitude || !myLongitude) {
        return null;
    }
    const bounds = getBoundsOfDistance({ latitude: myLatitude, longitude: myLongitude }, maxDistance * 1000); // convert to meter
    if (bounds.length !== 2) {
        return null;
    }

    return {
        lngMax: bounds[0].longitude >= bounds[1].longitude ? bounds[0].longitude : bounds[1].longitude,
        lngMin: bounds[0].longitude <= bounds[1].longitude ? bounds[0].longitude : bounds[1].longitude,
        latMax: bounds[0].latitude >= bounds[1].latitude ? bounds[0].latitude : bounds[1].latitude,
        latMin: bounds[0].latitude <= bounds[1].latitude ? bounds[0].latitude : bounds[1].latitude,
    };
}
export default function ClothingsFilter({ history }: RouteComponentProps) {
    const [priceRange, setPriceRange] = useState<[number, number]>([0, MAX_PRICE]);
    const [minRating, setMinRating] = useState(0);
    const [colors, setColors] = useState<number[]>([]);
    const [bustRange, setBustRange] = useState<[number, number]>([29, 45]);
    const [waistRange, setWaistRange] = useState<[number, number]>([29, 45]);
    const [hipsRange, setHipsRange] = useState<[number, number]>([29, 45]);
    const [sizes, setSizes] = useState<string[]>([]);
    const [manufacturers, setManufacturers] = useState<number[]>([]);
    const [maxDistance, setMaxDistance] = useState<number>(40000);
    const [geolocationNeeded, setGeolocationNeeded] = useState(false);

    const { latitude: myLatitude, longitude: myLongitude } = useGeolocation(geolocationNeeded);

    const query: any = {
        "price[between]": `${priceRange[0]}..${priceRange[1]}`,
        "person.rating[gte]": minRating,
        colors,
        size: sizes,
        "bust[between]": `${bustRange[0]}..${bustRange[1]}`,
        "waist[between]": `${waistRange[0]}..${waistRange[1]}`,
        "hips[between]": `${hipsRange[0]}..${hipsRange[1]}`,
        manufacturer: manufacturers,
    };

    if (getMaxMinLngLat({ myLatitude, myLongitude, maxDistance })) {
        const maxMinLngLat = getMaxMinLngLat({ myLatitude, myLongitude, maxDistance });
        if (maxMinLngLat) {
            const { lngMax, lngMin, latMax, latMin } = maxMinLngLat!;
            query["person.location.lat[between]"] = `${latMin}..${latMax}`;
            query["person.location.lng[between]"] = `${lngMin}..${lngMax}`;
        }
    }
    // console.log("query", query);

    const { loading, error, data } = useQuery(GET_CLOTHINGS, {
        variables: { querystring: queryString.stringify(query, { arrayFormat: "bracket" }) },
        context: {
            // headers: {
            //     accept: "application/ld+json", // this header will reach the server
            // },
        },
    });
    const clothings = data ? (data.clothings as Clothing[]) : [];

    const { data: colorsData } = useQuery(GET_COLORS);
    const availableColors = colorsData ? (colorsData.colors as Color[]) : [];

    const availableSizes: string[] = ["XXL", "XL", "L", "M", "S", "XS", "XXS"];

    const { data: manufacturersData } = useQuery(GET_MANUFACTURERS);
    const availableManufacturers = manufacturersData ? (manufacturersData.manufacturers as Manufacturer[]) : [];

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

    const handleRangeChange = (setFn: (arg: [number, number]) => void) => (v: number | number[]) => {
        if (typeof v === "object") {
            if (v.length === 2) {
                setFn(v as [number, number]);
            }
        }
    };

    return (
        <>
            <Drawer
                classes={{
                    paper: classes.drawerPaper,
                }}
                anchor="bottom"
                open={controlsVisible}
                onClose={toggleDrawer(false)}
            >
                <div style={{padding : '10px'}}>
                <FormGroup>
                    <Typography gutterBottom>Price</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={0}
                        max={MAX_PRICE}
                        step={10}
                        defaultValue={priceRange}
                        onChangeCommitted={(e, newValues) => handleRangeChange(setPriceRange)(newValues)}
                    />
                    <Typography gutterBottom>Rating</Typography>
                    <Rating
                        value={minRating}
                        onChange={(event, newValue) => {
                            setMinRating(newValue);
                        }}
                    />

                    <Typography gutterBottom>Colors</Typography>
                    <FormGroup row>
                        {availableColors.length > 0 &&
                            availableColors.map(c => (
                                <div style={{ padding: "2px" }} key={c.id}>
                                    <ColorableCheckbox
                                        color="default"
                                        hexColor={c.hex}
                                        checked={colors.includes(c.id)}
                                        onChange={(e, checked) => {
                                            setColors(cols => (checked ? [...cols, c.id] : cols.filter(c2 => c2 !== c.id)));
                                        }}
                                    />
                                </div>
                            ))}
                    </FormGroup>

                    <Typography gutterBottom>Size</Typography>
                    <FormGroup row>
                        {availableSizes.map(c => (
                            <FormControlLabel
                                key={c}
                                control={
                                    <Checkbox
                                        color="default"
                                        checked={sizes.includes(c)}
                                        onChange={(e, checked) => {
                                            setSizes(szs => (checked ? [...szs, c] : szs.filter(c2 => c2 !== c)));
                                        }}
                                    />
                                }
                                label={c}
                            />
                        ))}
                    </FormGroup>

                    <Typography gutterBottom>Bust</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={29}
                        max={45}
                        step={1}
                        defaultValue={bustRange}
                        onChangeCommitted={(e, newValues) => handleRangeChange(setBustRange)(newValues)}
                    />
                    <Typography gutterBottom>Waist</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={29}
                        max={45}
                        step={1}
                        defaultValue={waistRange}
                        onChangeCommitted={(e, newValues) => handleRangeChange(setWaistRange)(newValues)}
                    />
                    <Typography gutterBottom>Hips</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={29}
                        max={45}
                        step={1}
                        defaultValue={hipsRange}
                        onChangeCommitted={(e, newValues) => handleRangeChange(setHipsRange)(newValues)}
                    />

                    <Typography gutterBottom>Manufacturers</Typography>
                    <FormGroup row>
                        {availableManufacturers.length > 0 &&
                            availableManufacturers.map(c => (
                                <FormControlLabel
                                    key={c.id}
                                    control={
                                        <Checkbox
                                            color="default"
                                            checked={manufacturers.includes(c.id)}
                                            onChange={(e, checked) => {
                                                setManufacturers(fctrs => (checked ? [...fctrs, c.id] : fctrs.filter(c2 => c2 !== c.id)));
                                            }}
                                        />
                                    }
                                    label={c.name}
                                />
                            ))}
                    </FormGroup>

                    <Typography gutterBottom>Max Distance</Typography>
                    <StyledSlider
                        valueLabelDisplay="auto"
                        min={10}
                        max={MAX_DISTANCE}
                        step={100}
                        defaultValue={maxDistance}
                        onChangeCommitted={(e, newValues) => {
                            if (!geolocationNeeded) {
                                setGeolocationNeeded(true);
                            }
                            setMaxDistance(newValues as number);
                        }}
                    />
                </FormGroup>
                </div>
            </Drawer>
            {loading && <Loading />}
            {clothings.map(c => (
                <ClothingInFilterCard key={c.id} clothing={c} history={history} />
            ))}
            {!controlsVisible && (
                <Fab aria-label="Filter" className={classes.fab} color="primary" onClick={() => setControlsVisible(true)}>
                    <FilterListIcon />
                </Fab>
            )}
        </>
    );
}