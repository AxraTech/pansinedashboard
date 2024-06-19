// eslint-disable-next-line react/prop-types
import Button from "../Button.jsx";

const Header = ({ headerHandler, category, title, customFun }) => {
    return (
        <div className="flex justify-between items-center mb-10">
            <div>
                <p className="text-lg text-gray-400 cursor-pointer" onClick={headerHandler}>{category}</p>
                <p className="text-3xl font-extrabold tracking-tight text-slate-900">{title}</p>
            </div>

            <Button title="Create" customFun={customFun}/>
        </div>
    )
}


export default Header;
