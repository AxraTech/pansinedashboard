import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from "./router/MainRouter.jsx";
import {ApolloProvider} from "@apollo/client";
import createApolloClient from "./graphql/apolloClient.jsx";
import {LoadingProvider} from "./contexts/LoadingContext.jsx";
import Loading from "./pages/Loading.jsx";

function App() {

    const apolloClient = createApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <LoadingProvider>
                <MainRouter />

                <ToastContainer/>

                <Loading/>
            </LoadingProvider>
        </ApolloProvider>
    )
}

export default App
