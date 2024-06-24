import Header from "../../components/layout/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useMutation, useQuery} from "@apollo/client";
import {ORDER_BY_PK} from "../../graphql/query/order.jsx";
import {useContext} from "react";
import Div from "../../components/Div.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {toast} from "react-toastify";
import {UPDATE_ORDER_STATUS_BY_PK} from "../../graphql/mutation/order.jsx";

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api call
    const { loading, data: order } = useQuery(ORDER_BY_PK, { variables: { id} })
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS_BY_PK, { refetchQueries: [ { query: ORDER_BY_PK , variables: { id }  }] })


    // Start Function
    const backHandler = () => {
        navigate("/order")
    };

    const orderStatusHandler = async (title, type) => {
        if(confirm(`Are you sure you want to ${title}?`)){
            try{
                setLoading(true);
                setLoadingText("Updating Order Status")
                await updateOrderStatus({ variables: { id, status: type } })

                toast(`Update status change to ${title}`);
            }catch (e){
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }
    };
    // End Function

    if(loading) return "Loading..."

    return(
        <>
            <Header category="Order" title="Detail" headerHandler={backHandler}/>

            {/*    Start Payment Info*/}
            <p className="text-lg font-bold mb-3">Payment Info</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <div className="col-span-12">
                    <img className="w-3/5 md:w-1/5 border-2 p-2 mx-auto" src={order.orders_by_pk.payment_receipt_image_url} alt="payment screenshot"/>
                </div>

                <Div className="col-span-2" title="Account Name" data={order.orders_by_pk.payment_account_name}/>

                <Div className="col-span-2" title="Account Number" data={order.orders_by_pk.payment_account_number}/>

                <Div className="col-span-2"  title="Service Name" data={order.orders_by_pk.payment_service_name}/>

                <div className="col-span-3">
                    <TableButton color="bg-red-600" hoverColor="hover:bg-red-500"  customFun={() => orderStatusHandler("cancel", "canceled")}>Cancel</TableButton>
                    <TableButton color="bg-blue-600" hoverColor="hover:bg-blue-500"  customFun={() => orderStatusHandler("accept", "accepted")}>Accept</TableButton>
                </div>
            </div>
            {/*    End Payment Info*/}

            <hr className="h-px my-5 border-0 bg-gray-500"/>

            {/*Start Order Item*/}
            <p className="text-lg font-bold mb-3">Product Item</p>
            <div className="w-full rounded-lg border border-gray-200 shadow-md overflow-y-auto">
                <table
                    className="w-full whitespace-nowrap overflow-x-auto text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">Id</th>
                        <th scope="col" className="px-6 py-3">Title</th>
                        <th scope="col" className="px-6 py-3">Price</th>
                        <th scope="col" className="px-6 py-3">Quantity</th>
                        <th scope="col" className="px-6 py-3">Sub Total</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        order.orders_by_pk.order_items.map((p, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={p.id}>
                                <td className="px-6 py-4">
                                    {index + 1}
                                </td>
                                <td className="px-6 py-4">
                                    {p.product.title}
                                </td>
                                <td className="px-6 py-4">
                                    $ {p.item_price.toLocaleString("en-US")}
                                </td>
                                <td className="px-6 py-4">
                                    {p.quantity.toLocaleString("en-US")}
                                </td>
                                <td className="px-6 py-4">
                                    $ {p.sub_total.toLocaleString("en-US")}
                                </td>
                            </tr>
                        ))
                    }

                    </tbody>
                </table>
            </div>
            {/*End Order Item*/}

            <hr className="h-px my-5 border-0 bg-gray-500"/>

            {/*Start Order Item*/}
            <p className="text-lg font-bold mb-3">Detail</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <Div className="col-span-2" title="Order Number" data={order.orders_by_pk.order_number}/>

                <Div className="col-span-2" title="Items Total" data={order.orders_by_pk.items_total}/>

                <Div className="col-span-2" title="Grand Total" data={order.orders_by_pk.grand_total.toLocaleString("en-US")}/>

                <Div className="col-span-2" title="Delivery Fee" data={order.orders_by_pk.delivery_fee}/>

                <div className="col-span-3 md:col-span-2">
                    <p className="font-medium mb-2">Status</p>
                    <span className={`
                                    ${order.orders_by_pk.status === "pending" ? "bg-orange-600" : ""} 
                                    ${order.orders_by_pk.status === "delivering" ? "bg-sky-800" : ""} 
                                    ${order.orders_by_pk.status === "delivered" ? "bg-blue-800" : ""} 
                                    ${order.orders_by_pk.status === "canceled" ? "bg-red-800" : ""} 
                                    ${order.orders_by_pk.status === "returned" ? "bg-red-500" : ""} 
                                    ${order.orders_by_pk.status === "accepted" ? "bg-green-700" : ""} 
                                    rounded
                                    text-white px-2 p-1
                                `}
                    >{order.orders_by_pk.status.toUpperCase()}</span>
                </div>

                <Div className="col-span-2"  title="Created At" data={order.orders_by_pk.created_at}/>

                <Div className="col-span-2" title="Delivering At"
                     data={order.orders_by_pk.delivering_at ? order.orders_by_pk.delivering_at : "-"}/>

                <Div className="col-span-2" title="Delivered At"
                     data={order.orders_by_pk.delivered_at ? order.orders_by_pk.delivered_at : "-"}/>

                <Div className="col-span-2" title="Accepted At" data={order.orders_by_pk.accepted_at ? order.orders_by_pk.accepted_at : "-"}/>

                <Div className="col-span-2" title="Canceled At" data={order.orders_by_pk.canceled_at ? order.orders_by_pk.canceled_at : "-"}/>

                <Div className="col-span-2" title="Returned At" data={order.orders_by_pk.returned_at ? order.orders_by_pk.returned_at : "-"}/>
            </div>
            {/*End Order Item*/}

            <hr className="h-px my-5 border-0 bg-gray-500"/>

            {/* Start User Info*/}
            <p className="text-lg font-bold mb-3">User Info</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <Div className="col-span-2" title="Name" data={order.orders_by_pk.customer_name}/>
                <Div  className="col-span-2" title="Address" data={order.orders_by_pk.customer_address}/>
                <Div className="col-span-2" title="Phone" data={order.orders_by_pk.customer_phone}/>
                <Div className="col-span-2" title="Note" data={order.orders_by_pk.customer_note ? order.orders_by_pk.customer_note : "-"}/>
            </div>
            {/* End User Info*/}
        </>
    )
}

export default OrderDetail;