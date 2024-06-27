import Header from "../../components/layout/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {ORDER_BY_PK} from "../../graphql/query/order.jsx";
import Div from "../../components/Div.jsx";
import PaymentInfo from "../../components/order/PaymentInfo.jsx";
import OrderItem from "../../components/order/OrderItem.jsx";
import Detail from "../../components/order/Detail.jsx";
import UserInfo from "../../components/order/UserInfo.jsx";

const OrderDetail = () => {
    const navigate = useNavigate();
    const { id } = useParams();

    // api call
    const { loading, data: order } = useQuery(ORDER_BY_PK, { variables: { id} })

    // Start Function
    const backHandler = () => {
        navigate("/order")
    };

    // End Function

    if(loading) return "Loading..."

    return(
        <>
            <Header category="Order" title="Detail" headerHandler={backHandler}/>

            {/*    Start Payment Info*/}
            <PaymentInfo order={order.orders_by_pk} id={id}/>
            {/*    End Payment Info*/}

            {/*Start Order Item*/}
            <OrderItem order={order.orders_by_pk}/>
            {/*End Order Item*/}


            {/*Start Order Detail*/}
            <Detail order={order.orders_by_pk}/>
            {/*End Order Detail*/}

            {/* Start User Info*/}
            <UserInfo order={order.orders_by_pk}/>
            {/* End User Info*/}
        </>
    )
}

export default OrderDetail;