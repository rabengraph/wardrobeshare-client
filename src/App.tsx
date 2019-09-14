import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./routes/Home";
import User from "./routes/User";
import Clothing from "./routes/Clothing";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient } from "apollo-client";
import { InMemoryCache } from "apollo-cache-inmemory";
import { RestLink } from "apollo-link-rest";

// setup your `RestLink` with your endpoint
const restLink = new RestLink({ uri: process.env.REACT_APP_API_ENTRYPOINT });

// setup your client
const client = new ApolloClient({
    link: restLink,
    cache: new InMemoryCache(),
});

const App: React.FC = () => {
    return (
        <ApolloProvider client={client}>
            <div className="App">
                <header></header>
                <Router>
                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/user/:id" component={User} />
                        <Route exact path="/clothing/:id" component={Clothing} />
                    </Switch>
                </Router>
            </div>
        </ApolloProvider>
    );
};

export default App;
