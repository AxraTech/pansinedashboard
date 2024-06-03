import {createContext, useState} from "react";

const LoadingContext = createContext();

// eslint-disable-next-line react/prop-types
const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);

    return(
        <LoadingContext.Provider value={{ loading, setLoading }}>
            {children}
        </LoadingContext.Provider>
    )
};

export default LoadingContext;
export { LoadingProvider };