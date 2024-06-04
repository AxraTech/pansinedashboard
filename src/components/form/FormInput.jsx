import {memo} from "react";

const FormInput = ({ label, placeHolder, value, error, customFun }) => {
    return (
        <div className="col-span-12 md:col-span-6 mb-3">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <input type="text" id={label} value={value}
                   className={`border ${error ? "border-red-500 text-red-500 placeholder-red-500" : "border-gray-500 text-white placeholder-white"} text-sm rounded-lg focus:ring-red-500 bg-gray-700 focus:border-red-500 block w-full px-2.5 py-3`}
                   placeholder={placeHolder} onChange={customFun}/>
            <p className={`${error ? "block" : "hidden"} mt-2 text-sm text-red-500`}>
                <span className="font-medium">{error}</span>
            </p>
        </div>
    )
};

export default memo(FormInput);