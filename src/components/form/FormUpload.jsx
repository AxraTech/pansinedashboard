import {memo} from "react";

const FormUpload = ({ label, error, customFun }) => {
    return(
        <div className="col-span-12 md:col-span-6 mb-3">
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor={label}>{label}</label>
            <input className={`border ${error ? "border-red-500 text-red-500 placeholder-red-500" : "border-gray-500 text-white placeholder-white"} text-sm rounded-lg focus:ring-red-500 bg-gray-700 focus:border-red-500 block w-full p-2.5`} aria-describedby={`${label}_help`} id={label} type="file" onChange={customFun} />
            <div className="mt-1 text-sm text-gray-500" id={`${label}_help`}>Size 500 * 500</div>
        </div>
    )
};

export default memo(FormUpload);