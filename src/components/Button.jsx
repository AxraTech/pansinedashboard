const Button = ({ customFun, title}) => {
    return (
        <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg ${customFun ? "inline-block" : "hidden"}`}
            onClick={customFun}>
            { title }
        </button>
    )
};

export default Button