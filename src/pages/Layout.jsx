import {Outlet} from "react-router-dom";
import {useState} from "react";
import SideBar from "../components/layout/SideBar.jsx";
import NavBar from "../components/layout/NavBar.jsx";

const Layout = () => {
    const [activeMenu, setActiveMenu] = useState(true);

    return (
        <div className="container h-screen grid grid-cols-12 overflow-hidden">
            {/*Start Side Bar*/}
            {/*<div className="flex relative">*/}
            <div className="col-span-2 w-full">
                <SideBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
            </div>
            {/*End Side Bar*/}

            <div className={activeMenu ? 'min-h-screen col-span-12 md:col-span-10 w-full md:pl-10' : 'col-span-12 w-full min-h-screen flex-2'}>
                <div className="h-full w-full grid grid-rows-12">
                    {/*Start Nav Bar*/}
                    <NavBar activeMenu={activeMenu} setActiveMenu={setActiveMenu}/>
                    {/*End Nav Bar*/}

                    <div className="row-span-11 overflow-hidden">
                        <Outlet/>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Layout;