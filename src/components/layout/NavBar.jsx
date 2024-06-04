import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowDown, faBars} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/avatar.jpg"
import {useState} from "react";
import UserProfile from "./UserProfile.jsx";

// eslint-disable-next-line react/prop-types
const NavBar = ({ activeMenu, setActiveMenu }) => {
    const [clickProfile, setClickProfile] = useState(false);

    // Start Function
    const sideBarHandler = () => {
        setActiveMenu(!activeMenu)
        window.localStorage.setItem("showSideBar", !activeMenu);
    }
    // End Function

    return (
        <div className="row-span-1 flex justify-between p-2 md:ml-6 md:mr-6 relative">
            <button className="text-xl rounded-md px-3 py-1 hover:bg-gray-400 hover:text-white" onClick={sideBarHandler}>
                <FontAwesomeIcon icon={faBars} />
            </button>

            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-gray-400 rounded-lg text-gray-400 text-14 hover:text-white" onClick={() => setClickProfile(true)}>
                <img className="rounded-full w-8 h-8" src={avatar} alt="user-profile"/>

                <p>
                    <span>Hi,</span>{' '}
                    <span className="font-bold ml-1">Michael</span>
                    <span className="font-bold ml-3">
                        <FontAwesomeIcon icon={faArrowDown} />
                    </span>
                </p>
            </div>

            {
                clickProfile && (<UserProfile setClickProfile={setClickProfile}/>)
            }
        </div>
    )
};

export default NavBar;