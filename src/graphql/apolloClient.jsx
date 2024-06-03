import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client";
import {setContext} from "@apollo/client/link/context";
import authStorage from "../utils/authStorage";
import {onError} from "@apollo/client/link/error";

const httpLink = createHttpLink({
    uri: 'https://pann-sine.hasura.app/v1/graphql',
});

const errorLink = onError(({graphQLErrors, networkError}) => {
    //clear jwt if expired
    if (graphQLErrors) {
        console.log("[graphQLErrors]", graphQLErrors);
        graphQLErrors.forEach(({extensions}) => {
                if (extensions.code === "invalid-jwt") {
                    authStorage.clearToken();
                    alert("Session Expired, Please Sign In With Your Credentials Again");
                }
            },
        );
    }
    if (networkError) {
        console.log(`[Network error]: ${networkError}`);
        alert("network connection problem");
    }
});

const createApolloClient = () => {
    const authLink = setContext(async (_, {headers}) => {
        try {
            return {
                headers: {
                    ...headers,
                    'x-hasura-admin-secret': "yorHiIjl4qYc5kyKgkN2yEcYgn6FuJD9FoCy1H9gY3UToBWwrtO037c1FD5BfHck"
                },
            };
        } catch (e) {
            return {
                headers,
            };
        }
    });

    return new ApolloClient({
        link: errorLink.concat(authLink).concat(httpLink),
        cache: new InMemoryCache(),
    });
};

export default createApolloClient;
