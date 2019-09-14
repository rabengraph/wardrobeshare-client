import React from "react";
import { User } from "../types";
import UserCard from "../components/UserCard";
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

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

export default function Home() {
    const { loading, error, data } = useQuery(GET_PERSONS);
    const users = data ? (data.persons as User[]) : [];

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error :(</p>;

    return (
        <>
            {users.map(c => (
                <UserCard key={c.id} user={c} />
            ))}
        </>
    );
}
