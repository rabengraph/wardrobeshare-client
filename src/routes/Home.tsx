import React from "react";
import { User } from "../types";
import UserCard from "../components/UserCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import LoadingFull from "../components/LoadingFull";
import { RouteComponentProps } from "react-router";

const GET_PERSONS = gql`
    query persons {
        persons @rest(type: "User", path: "users/") {
            id
            name
            location
            avatar
            clothings
        }
    }
`;

export default function Home({ history }: RouteComponentProps) {
    const { loading, error, data } = useQuery(GET_PERSONS);
    const users = data ? (data.persons as User[]) : [];

    if (loading) return <LoadingFull />;
    if (error) return <p>Error :(</p>;
    return (
        <>
            {users.map(c => (
                <UserCard key={c.id} user={c} history={history} />
            ))}
        </>
    );
}
