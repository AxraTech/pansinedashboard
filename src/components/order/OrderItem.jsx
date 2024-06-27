const OrderItem = ({ order }) => {

    return (
        <>
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
                        order.order_items.map((p, index) => (
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

            <hr className="h-px my-5 border-0 bg-gray-500"/>
        </>
    )
};

export default OrderItem;