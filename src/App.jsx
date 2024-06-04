import './App.css'
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import MainRouter from "./router/MainRouter.jsx";
import {ApolloProvider} from "@apollo/client";
import createApolloClient from "./graphql/apolloClient.jsx";
import {LoadingProvider} from "./contexts/LoadingContext.jsx";
import Loading from "./components/Loading.jsx";
import ModalBox from "./components/ModalBox.jsx";
import {ModalProvider} from "./contexts/ModalContext.jsx";

function App() {

    const apolloClient = createApolloClient();

    return (
        <ApolloProvider client={apolloClient}>
            <LoadingProvider>
                <ModalProvider>
                    <MainRouter />

                    <ToastContainer/>

                    <Loading/>

                    <ModalBox />
                </ModalProvider>
            </LoadingProvider>
        </ApolloProvider>
    )
}

export default App
