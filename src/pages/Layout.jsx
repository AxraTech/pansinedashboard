import {Outlet, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import SideBar from "../components/layout/SideBar.jsx";
import NavBar from "../components/layout/NavBar.jsx";

const Layout = () => {
    const [activeMenu, setActiveMenu] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const showSideBar = window.localStorage.getItem("showSideBar");

        if(showSideBar !== null){
            const isActive = showSideBar.toLocaleLowerCase() === "true";
            setActiveMenu(isActive)
        }

        if(!window.localStorage.getItem("login")){
            navigate("/");
        }
    }, [activeMenu]);

    return (
        <div className="container h-screen grid grid-cols-12 overflow-hidden">
            {/*Start Side Bar*/}
            <div className="col-span-2 w-full">
                <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            </div>
            {/*End Side Bar*/}

            <div className={activeMenu ? 'min-h-screen col-span-12 md:col-span-10 w-full md:pl-10' : 'col-span-12 w-full min-h-screen flex-2'}>
                <div className="h-full w-full grid grid-rows-12">
                    {/*Start Nav Bar*/}
                    <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                    {/*End Nav Bar*/}

                    <div className="row-span-11 overflow-y-auto">
                        <div className="w-full h-full px-2 md:px-8">
                            <Outlet/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Layout;