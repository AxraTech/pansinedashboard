import {memo, useContext} from "react";
import ModalContext from "../contexts/ModalContext.jsx";

const ModalBox = ( ) => {
    const { showModal, modalButton, modalText, cancelHandler, deleteHandler } = useContext(ModalContext);


    return(
        <>
            {
                showModal &&
                    <div
                        className="w-full h-screen bg-gray-600 bg-opacity-50 fixed left-0 top-0 flex justify-center items-center z-50">
                        <div
                            className="w-4/4 md:w-2/6 h-1/6 bg-white rounded shadow-md flex flex-col justify-center items-center px-5 py-5">
                            <p className="text-md md:text-lg font-bold my-3">{modalText}</p>

                            <div className="flex">
                                <button type="button"
                                        className={`text-white ${modalButton ? "bg-blue-400 cursor-progress" : "bg-blue-700 hover:bg-blue-800" } focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none shadow-md`}
                                        onClick={cancelHandler}
                                    disabled={modalButton}
                                >
                                    Cancel
                                </button>

                                <button type="button"
                                        className={`text-white ${modalButton ? "bg-red-400 cursor-progress" : "bg-red-700 hover:bg-red-800" }  focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none shadow-md`}
                                        onClick={deleteHandler}
                                    disabled={modalButton}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
            }
        </>

    )
};

export default memo(ModalBox)