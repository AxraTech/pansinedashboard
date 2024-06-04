import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faKey, faUser} from "@fortawesome/free-solid-svg-icons";
import {toast} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import LoadingContext from "../contexts/LoadingContext.jsx";
import {useNavigate} from "react-router-dom";

const Login = () => {
    const [ userData, setUserData ] = useState({
        username: "",
        password: "",
    });
    // useContext
    const navigate = useNavigate();

    useEffect(() => {
        if(window.localStorage.getItem("login")){
            navigate("/product")
        }
    }, []);


    // Start FUnction
    const inputHandler = (value, input) => {
        setUserData({ ...userData, [input]: value})
    }

    const loginHandler = () => {
        if(userData.username === "admin" && userData.password === "password"){
            window.localStorage.setItem("login", true);
            navigate("/product");
            toast("Login Successfully");
        }else{
            setUserData({
                username: "",
                password: "",
            })
            toast("Username or password wrong");
        }
    }
    // End FUnction

    return(
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
            <div className="w-full h-3/6 md:w-3/6 md:h-4/6 bg-white shadow rounded-lg flex justify-center items-center flex-col mx-1">
                <p className="text-lg md:text-2xl font-bold">Pan Sine Dashboard</p>

                <div className="w-full md:w-4/6 px-3">
                    <label htmlFor="website-admin"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <div className="flex">
                    <span
                        className="inline-flex items-center px-3 text-sm   border rounded-e-0 border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
                        <FontAwesomeIcon icon={faUser}/>
                    </span>
                        <input type="text" id="website-admin"
                               className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-3  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Enter Your Username" onChange={(e) => inputHandler(e.target.value, "username")}/>
                    </div>

                    <label htmlFor="website-admin"
                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username</label>
                    <div className="flex">
                    <span
                        className="inline-flex items-center px-3 text-sm   border rounded-e-0 border-e-0 rounded-s-md bg-gray-600 text-gray-400 border-gray-600">
                        <FontAwesomeIcon icon={faKey}/>
                    </span>
                        <input type="text" id="website-admin"
                               className="rounded-none rounded-e-lg border block flex-1 min-w-0 w-full text-sm p-3  bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                               placeholder="Enter Your Password" onChange={(e) => inputHandler(e.target.value, "password")}/>
                    </div>

                    <button className="w-full bg-blue-600 text-white rounded-md py-3 hover:bg-blue-400 mt-5"
                            onClick={loginHandler}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    )
};

export default Login