import {memo} from "react";

const FormSelect = ({ label, error, value, data, customFun }) => {
    console.log("select", value);
    return (
        <div className="col-span-12 md:col-span-6 mb-3">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-700">{label}</label>
            <select id={label} defaultValue={`${value}`} className={`border ${error ? "border-red-500 text-red-500 placeholder-red-500" : "border-gray-500 text-white placeholder-white"} text-sm rounded-lg focus:ring-blue-500 bg-gray-700 focus:border-blue-500 block w-full px-2.5 py-3`} onChange={customFun}>
                <option disabled={true} value="0">Select Your Category</option>
                {
                    data ?
                        data.map(d => (
                            <option key={d.id} value={`${d.id}`} selected={d.id === value ? true : false}>[{d.category_level}] - {d.category_name}</option>
                        ))
                        :
                        <option disabled={true} value="loading">Loading .... </option>
                }
            </select>

            <p className={`${error ? "block" : "hidden"} mt-2 text-sm text-red-500`}>
                <span className="font-medium">{error}</span>
            </p>
        </div>

    )
}

export default memo(FormSelect);