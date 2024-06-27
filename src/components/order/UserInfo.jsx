import Div from "../Div.jsx";

const UserInfo = ({ order }) => {
    return (
        <>
            <p className="text-lg font-bold mb-3">User Info</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <Div className="col-span-2" title="Name" data={order.customer_name}/>
                <Div className="col-span-2" title="Address" data={order.customer_address}/>
                <Div className="col-span-2" title="Phone" data={order.customer_phone}/>
                <Div className="col-span-2" title="Note"
                     data={order.customer_note ? order.customer_note : "-"}/>
            </div>
        </>
    )
};

export default UserInfo;