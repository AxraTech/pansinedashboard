import Div from "../Div.jsx";

const Detail = ({ order }) => {
    return(
        <>
            <p className="text-lg font-bold mb-3">Detail</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <Div className="col-span-2" title="Order Number" data={order.order_number}/>

                <Div className="col-span-2" title="Items Total" data={order.items_total}/>

                <Div className="col-span-2" title="Grand Total"
                     data={order.grand_total.toLocaleString("en-US")}/>

                <Div className="col-span-2" title="Delivery Fee" data={order.delivery_fee}/>

                <div className="col-span-6 md:col-span-2">
                    <p className="font-medium mb-2">Status</p>
                    <span className={`
                                    ${order.status === "pending" ? "bg-orange-600" : ""} 
                                    ${order.status === "delivering" ? "bg-sky-800" : ""} 
                                    ${order.status === "delivered" ? "bg-blue-800" : ""} 
                                    ${order.status === "canceled" ? "bg-red-800" : ""} 
                                    ${order.status === "returned" ? "bg-red-500" : ""} 
                                    ${order.status === "accepted" ? "bg-green-700" : ""} 
                                    rounded
                                    text-white px-2 p-1
                                `}
                    >{order.status.toUpperCase()}</span>
                </div>

                <Div className="col-span-2" title="Created At"
                     data={
                         < p >
                            {new Date(order.created_at).toLocaleDateString()}
                            <br className="block md:hidden"/>
                            <span className="hidden md:inline-block px-2"> - </span>
                            {new Date(order.created_at).toLocaleTimeString()}
                         </p>
                     }/>

                <Div className="col-span-2" title="Canceled At"
                     data={order.canceled_at ?
                         <p>
                             {new Date(order.canceled_at).toLocaleDateString()}
                             <br className="block md:hidden"/>
                             <span className="hidden md:inline-block px-2"> - </span>
                             {new Date(order.canceled_at).toLocaleTimeString()}
                         </p>
                         : "-"
                     }/>

                <Div className="col-span-2" title="Accepted At"
                     data={order.accepted_at ?
                         <p>
                             {new Date(order.accepted_at).toLocaleDateString()}
                             <br className="block md:hidden"/>
                             <span className="hidden md:inline-block px-2"> - </span>
                             {new Date(order.accepted_at).toLocaleTimeString()}
                         </p>
                         :
                         "-"}/>

                <Div className="col-span-2" title="Delivering At"
                     data={order.delivering_at ? <p>
                             {new Date(order.delivering_at).toLocaleDateString()}
                             <br className="block md:hidden"/>
                             <span className="hidden md:inline-block px-2"> - </span>
                             {new Date(order.delivering_at).toLocaleTimeString()}
                         </p>
                         :
                         "-"}/>

                <Div className="col-span-2" title="Delivered At"
                     data={order.delivered_at ? <p>
                             {new Date(order.delivered_at).toLocaleDateString()}
                             <br className="block md:hidden"/>
                             <span className="hidden md:inline-block px-2"> - </span>
                             {new Date(order.delivered_at).toLocaleTimeString()}
                         </p>
                         :
                         "-"}/>

                <Div className="col-span-2" title="Returned At"
                     data={order.returned_at ? <p>
                             {new Date(order.accepted_at).toLocaleDateString()}
                             <br className="block md:hidden"/>
                             <span className="hidden md:inline-block px-2"> - </span>
                             {new Date(order.accepted_at).toLocaleTimeString()}
                         </p>
                         :
                         "-"}/>
            </div>

            <hr className="h-px my-5 border-0 bg-gray-500"/>
        </>
    )
};

export default Detail;