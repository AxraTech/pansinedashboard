const TableButton = ({color, hoverColor, customFun, children}) => {
    return (
        <button className={`${color} ${hoverColor} text-white font-bold py-2 px-4 rounded mr-5`} onClick={customFun}>
            { children }
        </button>
    )
}

export default TableButton