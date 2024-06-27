import Div from "../Div.jsx";
import TableButton from "../table/TableButton.jsx";
import {toast} from "react-toastify";
import {useContext} from "react";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useMutation} from "@apollo/client";
import {UPDATE_ORDER_STATUS_BY_PK} from "../../graphql/mutation/order.jsx";
import {ORDER_BY_PK} from "../../graphql/query/order.jsx";

// eslint-disable-next-line react/prop-types
const PaymentInfo = ({ order, id }) => {
    console.log(order);

    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api call
    const [updateOrderStatus] = useMutation(UPDATE_ORDER_STATUS_BY_PK, { refetchQueries: [ { query: ORDER_BY_PK , variables: { id }  }] })

    const orderStatusHandler = async (title, type) => {
        if(confirm(`Are you sure you want to ${title}?`)){
            try{
                setLoading(true);
                setLoadingText("Updating Order Status")
                await updateOrderStatus({ variables: { id, data: { status: type, [`${type}_at`]:  new Date() } } })

                toast(`Update status change to ${title}`);
            }catch (e){
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }
    };

    return (
        <>
            <p className="text-lg font-bold mb-3">Payment Info</p>
            <div className="grid grid-cols-12 gap-y-5 gap-x-3">
                <div className="col-span-12">
                    <img className="w-3/5 md:w-1/5 border-2 p-2 mx-auto"
                         src={order.payment_receipt_image_url} alt="payment screenshot"/>
                </div>

                <Div className="col-span-2" title="Account Name" data={order.payment_account_name}/>

                <Div className="col-span-2" title="Account Number" data={order.payment_account_number}/>

                <Div className="col-span-2" title="Service Name" data={order.payment_service_name}/>

                <div className="col-span-3">
                    {
                        order.status === "pending" &&
                        <>
                            <TableButton color="bg-red-600" hoverColor="hover:bg-red-500"
                                         customFun={() => orderStatusHandler("cancel", "canceled")}>Cancel</TableButton>
                            <TableButton color="bg-blue-600" hoverColor="hover:bg-blue-500"
                                         customFun={() => orderStatusHandler("accept", "accepted")}>Accept</TableButton>
                        </>
                    }

                    {
                        order.status === "accepted" &&
                        <>
                            <TableButton color="bg-blue-600" hoverColor="hover:bg-blue-500"
                                         customFun={() => orderStatusHandler("delivering", "delivering")}>Delivering</TableButton>
                        </>
                    }

                    {
                        order.status === "delivering" &&
                        <>
                            <TableButton color="bg-blue-600" hoverColor="hover:bg-blue-500"
                                         customFun={() => orderStatusHandler("delivered", "delivered")}>Delivered</TableButton>
                        </>
                    }
                </div>
            </div>

            <hr className="h-px my-5 border-0 bg-gray-500"/>
        </>
    )
};

export default PaymentInfo;