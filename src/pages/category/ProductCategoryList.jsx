import Header from "../../components/layout/Header.jsx";
import {useNavigate} from "react-router-dom";
import {useQuery} from "@apollo/client";
import {PRODUCT_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import Table from "../../components/table/Table.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useContext} from "react";
import ModalContext from "../../contexts/ModalContext.jsx";

const tableHeader = ["Image", "Name", "Level", "Description", "Action"]


const ProductCategoryList = () => {
    const navigate = useNavigate();
    // useContext
    const { setShowModal,  setModalText, setDeleteHandler } = useContext(ModalContext);
    // api call
    const { data: productCategory } = useQuery(PRODUCT_CATEGORY_ALL);

    // Start Function
    const createHandle = () => {
        navigate("/category/create")
    }

    const editProductHandler = (id) => {
        navigate(`/category/edit/${id}`)
    }

    const deleteProductHandler = (id) => {
        setModalText("Are you sure you want to delete this category?");
        setShowModal(true);
        // setId(id);
        // setType("Category")
    }
    // ENd Function
    return (
        <>
            <Header category="Category" title="List" customFun={createHandle}/>

            <Table tableHeader={tableHeader} data={productCategory?.product_categories}>
                {
                    productCategory?.product_categories.map(each => (
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            key={each.id}>
                            <td className="px-6 py-4">
                                {
                                    each.image_url ?
                                        <img src={each.image_url} className="w-14 h-14 rounded-full" alt="image"/>
                                        :
                                        <p>-</p>
                                }
                            </td>
                            <td className="px-6 py-4">
                                {each.category_name}
                            </td>
                            <td className="px-6 py-4">
                                {each.category_level}
                            </td>
                            <td className="px-6 py-4">
                                {
                                    each.description?
                                        each.description.length > 80 ? `${each.description.slice(0, 80)}.....` : each.description
                                        :
                                        <p>-</p>
                                }
                            </td>
                            <td className="px-6 py-4">
                                <TableButton color={"bg-blue-500"} hoverColor={"hover:bg-blue-700"}
                                             customFun={() => editProductHandler(each.id)}><FontAwesomeIcon
                                    icon={faPenToSquare}/></TableButton>
                                <TableButton color={"bg-red-500"} hoverColor={"hover:bg-red-700"}
                                             customFun={() => deleteProductHandler(each.id)}><FontAwesomeIcon
                                    icon={faTrash}/></TableButton>
                            </td>
                        </tr>
                    ))
                }
            </Table>
        </>
    )
};

export default ProductCategoryList;