import {createContext, useContext, useState} from "react";
import {useMutation} from "@apollo/client";
import {DELETE_PRODUCT_BY_PK} from "../graphql/mutation/product.jsx";
import {PRODUCTS} from "../graphql/query/product.jsx";
import {toast} from "react-toastify";
import LoadingContext from "./LoadingContext.jsx";

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalButton, setModalButton] = useState(false);
    const [modalText, setModalText] = useState("");
    const [id, setId] = useState("");
    const [type, setType] = useState("");

    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api
    const [deleteProduct] = useMutation(DELETE_PRODUCT_BY_PK, { refetchQueries: [ { query: PRODUCTS } ] })

    const cancelHandler = () => {
        setShowModal(false);
    }

    const deleteHandler = async () => {
        try{
            setLoading(true);
            setShowModal(false);
            setLoadingText("Deleting")
            switch (type){
                case "Product":
                    await deleteProduct({ variables: { id: id }} )
                    break;
            }
        }catch (e) {
            setLoading(false);
            setShowModal(true);
            toast(e.message);
        }finally {
            setLoading(false);
            setShowModal(false);
            toast("Product Deleted Successfully");
        }
    }

    return(
        <ModalContext.Provider value={{showModal, setShowModal, modalButton, setModalButton, modalText, setModalText, id, setId, type, setType, cancelHandler, deleteHandler}}>
            {children}
        </ModalContext.Provider>
    )
};

export default ModalContext;