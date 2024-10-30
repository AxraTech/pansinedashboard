import { memo } from "react";

const FormConstantSelect = ({ label, error, value, data, customFun }) => {
    return (
        <div className="col-span-12 md:col-span-6 mb-3">
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-700">
                {label}
            </label>
            <select
                id={label}
                value={value} // Use value prop instead of defaultValue to allow controlled component behavior
                className={`border ${error ? "border-red-500 text-red-500 placeholder-red-500" : "border-gray-500 text-white placeholder-white"} text-sm rounded-lg focus:ring-blue-500 bg-gray-700 focus:border-blue-500 block w-full px-2.5 py-3`}
                onChange={customFun} // Pass the selected value to the custom function
            >
                <option disabled value="">
                    Select Your Category
                </option>
                {
                    data ? 
                        data.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))
                        : 
                        <option disabled value="loading">Loading...</option>
                }
            </select>

            {error && (
                <p className="mt-2 text-sm text-red-500">
                    <span className="font-medium">{error}</span>
                </p>
            )}
        </div>
    );
};

export default memo(FormConstantSelect);
