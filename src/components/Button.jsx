const Button = ({ customFun, title}) => {
    return (
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg hover:scale-105 duration-700 ${customFun ? "inline-block" : "hidden"}`}
            onClick={customFun}>
            { title }
        </button>
    )
};

export default Button