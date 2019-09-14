import React from "react";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";
import gql from "graphql-tag";
import { User } from "./types";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import Home from "./routes/Home";
// setup your `RestLink` with your endpoint
const restLink = new RestLink({ uri: process.env.REACT_APP_API_ENTRYPOINT });

// setup your client
const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
});

const query = gql`
    query luke {
        persons @rest(type: "User", path: "users/") {
            name
            avatar
            clothings
        }
    }
`;

const App: React.FC = () => {
    const [users, setUsers] = React.useState<User[]>([]);
    React.useEffect(() => {
        // Invoke the query and log the person's name
        client.query({ query }).then(response => {
            console.log(response.data);
            const data = response.data.persons as User[];
            setUsers(data);
        });
    }, []);
    return (
        <div className="App">
            <header></header>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <Home users={users} />} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;
