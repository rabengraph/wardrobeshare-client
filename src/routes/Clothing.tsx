import React from "react";
import { Clothing } from "../types";
import ClothingDetailCard from "../components/ClothingDetailCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router";
import LoadingFull from "../components/LoadingFull";

const GET_CLOTHING = gql`
    query clothing($id: Int!) {
        clothing(id: $id) @rest(type: "Clothing", path: "clothings/{args.id}") {
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
        }
    }
`;

export default function UserC({ match, history }: RouteComponentProps<{ id: string }>) {
    const { loading, error, data } = useQuery(GET_CLOTHING, {
        variables: { id: Number(match.params.id) },
    });
    const clothing = data ? (data.clothing as Clothing) : null;

    if (loading) return <LoadingFull />;
    if (error || !clothing) return <p>Error :(</p>;

    return <ClothingDetailCard clothing={clothing} history={history} />;
}
