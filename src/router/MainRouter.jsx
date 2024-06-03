import {BrowserRouter, Route, Routes} from "react-router-dom";
import Layout from "../pages/Layout.jsx";
import {routeData} from "../utils/routeData.jsx";
import PageNotFound from "../pages/PageNotFound.jsx";


const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout/>}>
                    {
                        routeData.map(route => (
                            <Route key={route.path} path={route.path} element={route.element}/>
                        ))
                    }
                </Route>

                <Route path="*" element={<PageNotFound/>}/>
            </Routes>
        </BrowserRouter>
    )
};

export default MainRouter;