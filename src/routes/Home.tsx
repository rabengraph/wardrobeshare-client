import React from "react";

import { User } from "../types";
import UserCard from "../components/UserCard";
interface Props {
    users: User[];
}

export default function Home({ users }: Props) {
    return (
        <>
            {users.map(c => (
                <UserCard key={c.id} user={c} />
            ))}
        </>
    );
}
