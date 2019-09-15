import React from "react";
import { User } from "../types";
import UserDetailCard from "../components/UserDetailCard";
import gql from "graphql-tag";
import { useQuery } from "@apollo/react-hooks";
import { RouteComponentProps } from "react-router";
import LoadingFull from "../components/LoadingFull";

const GET_PERSON = gql`
    query user($id: Int!) {
        user(id: $id) @rest(type: "User", path: "users/{args.id}") {
            id
            name
            slogan
            location
            avatar
            clothings
        }
    }
`;

export default function UserC({ match, history }: RouteComponentProps<{ id: string }>) {
    const { loading, error, data } = useQuery(GET_PERSON, {
        variables: { id: Number(match.params.id) },
    });
    const user = data ? (data.user as User) : null;

    console.log(match.params.id);

    console.log(data);
    if (loading) return <LoadingFull />;
    if (error || !user) return <p>Error :(</p>;

    return <UserDetailCard user={user} />;
}
