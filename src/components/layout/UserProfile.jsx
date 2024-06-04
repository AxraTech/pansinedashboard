import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRectangleXmark} from "@fortawesome/free-solid-svg-icons";
import avatar from "../../assets/avatar.jpg"
import {toast} from "react-toastify";
import {useNavigate} from "react-router-dom";

// eslint-disable-next-line react/prop-types
const UserProfile = ({ setClickProfile }) => {
    const navigate = useNavigate();

    const logoutHanlder = () => {
        setClickProfile(false);
        window.localStorage.removeItem("login");
        toast("Logout Successfully");
        navigate("/");
    }

    return (
        <div className="absolute right-1 top-16 bg-white p-8 rounded-lg border w-96 z-40 shadow-lg">
            <div className="flex justify-between items-center">
                <p className="font-semibold text-lg">User Profile</p>
                <button onClick={() => setClickProfile(false)} className="text-2xl">
                    <FontAwesomeIcon icon={faRectangleXmark}/>
                </button>
            </div>

            <div className="flex gap-5 items-center mt-6 border-gray-700 border-b-2 pb-6">
                <img
                    className="rounded-full h-24 w-24"
                    src={avatar}
                    alt="user-profile"
                />
                <div>
                    <p className="font-semibold text-xl"> Michael Roberts </p>
                    <p className="text-gray-600 text-sm"> Administrator </p>
                    <p className="text-gray-600 text-sm font-semibold"> info@shop.com </p>
                </div>
            </div>

            <div className="mt-5">
                <button className="w-full bg-red-600 text-white rounded-md py-3 hover:bg-red-400" onClick={logoutHanlder}>
                    Logout
                </button>
            </div>
        </div>
    )
};

export default UserProfile;