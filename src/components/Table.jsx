import {memo} from "react";

// eslint-disable-next-line react/prop-types
const Table = ({ tableHeader, children}) => {
    console.log("table");

    return (
        <div className="w-full rounded-lg border border-gray-200 shadow-md overflow-y-auto">
            <table className="w-full whitespace-nowrap overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        {
                            tableHeader.map(t => (
                                <th scope="col" className="px-6 py-3" key={t}>
                                    {t}
                                </th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        children
                    }
                </tbody>
            </table>
        </div>
    )
}

export default memo(Table);