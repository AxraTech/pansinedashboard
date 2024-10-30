import {memo, useContext} from "react";
import LoadingContext from "../../contexts/LoadingContext.jsx";

const FormButton = ({ cancelHandler, submitHandler, cancelText, submitText }) => {
    const{ loading } = useContext(LoadingContext);

    return (
        <div className="col-span-12 mb-3 flex justify-end items-end">
            <button type="button"
                    className="text-white hover:scale-105 duration-700 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={cancelHandler}
                    disabled={loading}
            >
                {cancelText}
            </button>

            <button type="button"
                    className="text-white hover:scale-105 duration-700 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
                onClick={submitHandler}
                    disabled={loading}
            >
                {submitText}
            </button>
        </div>
    )
};

export default memo(FormButton)