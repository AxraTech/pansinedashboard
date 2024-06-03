import {Link, NavLink} from "react-router-dom";
import {linkData} from "../../utils/routeData.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRectangleXmark} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const SideBar = ({ activeMenu, setActiveMenu }) => {
    const handleCloseSideBar = () => {
    }

    const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-white bg-gray-700  text-md m-2';
    const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 hover:bg-gray-700 hover:text-white m-2';


    return (
        <div className={`${activeMenu ? "w-72 shadow-lg" : "w-0"} fixed bg-white z-50`}>
            <div className="h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 mx-2">
                <div className="flex justify-between items-center pb-5">
                    <Link to="/" onClick={handleCloseSideBar}  className="items-center gap-3 ml-3 mt-4 flex text-2xl font-extrabold tracking-tight  text-slate-900">
                         <span>Pan Sine</span>
                    </Link>

                    <button onClick={() => setActiveMenu(false)} className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden">
                        <FontAwesomeIcon icon={faRectangleXmark} />
                    </button>
                </div>

                <hr/>

                <div className="mt-5">
                    {
                        linkData.map(item => (
                            <div key={item.title}>
                                <p className="text-gray-400 m-3 mt-4 uppercase">
                                    {item.title}
                                </p>

                                {
                                    item.links.map((link) => (
                                        <NavLink to={link.path} key={link.name}   className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                                            {link.icon}
                                            <span className="capitalize">{link.name}</span>
                                        </NavLink>
                                    ))
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
};

export default SideBar;