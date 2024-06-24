const Div = ({ className, title, data}) => {
    return (
        <div className={`col-span-6 md:${className}`}>
            <p className="font-medium mb-2">{title}</p>
            <p className="text-sm">{data}</p>
        </div>
    )
};

export default Div;