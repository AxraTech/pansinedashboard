import Header from "../../components/layout/Header.jsx";
import {useNavigate} from "react-router-dom";
import Table from "../../components/table/Table.jsx";
import {useQuery} from "@apollo/client";
import {ORDERS} from "../../graphql/query/order.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleInfo, faPenToSquare} from "@fortawesome/free-solid-svg-icons";

const tableHeader = ["Order Number", "Items Total", "Grand Total", "Customer Name", "Status","Action"]

const OrderLists = () => {
    const navigate = useNavigate();
    //api call
    const { data: order } = useQuery(ORDERS);

    // Start Function
    const orderDetailHandler = (id) => {
        navigate(`/order/detail/${id}`);
    }
    // End Function
    return(
        <>
            <Header category="Order" title="List"/>
            <Table tableHeader={tableHeader} data={order?.orders}>
                {
                    order?.orders.map(d => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={d.id}>
                            <td className="px-6 py-4">
                                {d.order_number}
                            </td>
                            <td className="px-6 py-4">
                                {d.items_total.toLocaleString("en-US")}
                            </td>
                            <td className="px-6 py-4">
                                $ {d.grand_total.toLocaleString("en-US")}
                            </td>
                            <td className="px-6 py-4">
                                {d.customer_name}
                            </td>
                            <td className="px-6 py-3">
                                <span className={`
                                    ${d.status === "pending" ? "bg-orange-600" : ""} 
                                    ${d.status === "delivering" ? "bg-sky-800" : ""} 
                                    ${d.status === "delivered" ? "bg-blue-800" : ""} 
                                    ${d.status === "canceled" ? "bg-red-800" : ""} 
                                    ${d.status === "returned" ? "bg-red-500" : ""} 
                                    ${d.status === "accepted" ? "bg-green-700" : ""} 
                                    rounded
                                    text-white px-2 p-1
                                `}>
                                    {d.status.toUpperCase()}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <TableButton color={"bg-blue-500"} hoverColor={"hover:bg-blue-700"} customFun={() => orderDetailHandler(d.id)}><FontAwesomeIcon icon={faCircleInfo} /></TableButton>
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </>
    )
}

export default OrderLists;