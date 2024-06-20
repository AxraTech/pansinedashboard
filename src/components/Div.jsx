const Div = ({ title, data}) => {
    return (
        <div className="col-span-6 md:col-span-2">
            <p className="font-medium mb-2">{title}</p>
            <p className="text-sm">{data}</p>
        </div>
    )
};

export default Div;