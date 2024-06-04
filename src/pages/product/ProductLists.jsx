import Header from "../../components/layout/Header.jsx";
import Table from "../../components/table/Table.jsx";
import {useQuery} from "@apollo/client";
import {PRODUCTS} from "../../graphql/query/product.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useNavigate} from "react-router-dom";
import {useContext} from "react";
import ModalContext from "../../contexts/ModalContext.jsx";

const tableHeader = ["Image", "Title", "Description", "Product Category", "Price", "Action"]

const ProductLists = () => {
    const navigate = useNavigate();
    // useContext
    const { setShowModal, setId, setModalText, setType } = useContext(ModalContext);
    // api call
    const { data: productLists } = useQuery(PRODUCTS)

    // Start Function
    const createHandle = () => {
        navigate("/product/create")
    }

    const editProductHandler = (id) => {
        navigate(`/product/edit/${id}`)
    }

    const deleteProductHandler = (id) => {
        setModalText("Are you sure you want to delete this product?");
        setShowModal(true);
        setId(id);
        setType("Product")
    }
    // End Function

    return (
        <>
            <Header category="Product" title="List" customFun={createHandle}/>

            <Table tableHeader={tableHeader} data={productLists?.products}>
                {
                    productLists?.products.map(d => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={d.id}>
                            <td className="px-6 py-4">
                                <img src={d.main_image_url} className="w-14 h-14 rounded-full"/>
                            </td>
                            <td className="px-6 py-4">
                                {d.title}
                            </td>
                            <td className="px-6 py-4">
                                {
                                    d.body_html.length > 80 ? `${d.body_html.slice(0, 80)}.....` : d.body_html
                                }
                            </td>
                            <td className="px-6 py-4">
                                {d.product_category?.category_name}
                            </td>
                            <td className="px-6 py-4">
                                $ {d.price}
                            </td>
                            <td className="px-6 py-4">
                                <TableButton color={"bg-blue-500"} hoverColor={"hover:bg-blue-700"} customFun={() => editProductHandler(d.id)}><FontAwesomeIcon icon={faPenToSquare} /></TableButton>
                                <TableButton color={"bg-red-500"} hoverColor={"hover:bg-red-700"} customFun={() => deleteProductHandler(d.id)}><FontAwesomeIcon icon={faTrash} /></TableButton>
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </>
    )
};

export default ProductLists;