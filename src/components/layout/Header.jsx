// eslint-disable-next-line react/prop-types
const Header = ({ headerHandler, category, title, customFun }) => {
    return (
        <div className="flex justify-between items-center mb-10">
            <div>
                <p className="text-lg text-gray-400 cursor-pointer" onClick={headerHandler}>{category}</p>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p>
            </div>

            <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ${customFun ? "inline-block": "hidden"}`} onClick={customFun}>
                Create
            </button>
        </div>
    )
}


export default Header;
