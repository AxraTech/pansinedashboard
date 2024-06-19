import {createContext, useState, useTransition} from "react";

const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState("Loading");

    const [isPending, startTransition] = useTransition();

    return(
        <LoadingContext.Provider value={{ loading, setLoading, loadingText, setLoadingText, isPending, startTransition }}>
            {children}
        </LoadingContext.Provider>
    )
};

export default LoadingContext;
export { LoadingProvider };