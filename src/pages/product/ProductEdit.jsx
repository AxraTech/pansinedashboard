import FormInput from "../../components/form/FormInput.jsx";
import Header from "../../components/layout/Header.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";
import FormUpload from "../../components/form/FormUpload.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {useContext, useEffect, useState} from "react";
import {productFormValidation} from "../../utils/formValidation.jsx";
import {UPDATE_PRODUCT_BY_PK} from "../../graphql/mutation/product.jsx";
import {PRODUCTS, PRODUCTS_BY_PK} from "../../graphql/query/product.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useNavigate, useParams} from "react-router-dom";

const ProductEdit = () => {
    // useState
    const [data, setData] = useState({
        title: "",
        body_html: "",
        main_image_url: "",
        product_category_id: "",
        price: ""
    });
    const [error, setError] = useState({});
    const { id } = useParams();
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // useNavigate
    const navigate = useNavigate();
    // api call
    const { loading, data: product } = useQuery(PRODUCTS_BY_PK, { variables: { id }});
    const { data: productCategory } = useQuery(PRODUCT_SUB_CATEGORY_ALL);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_BY_PK, { refetchQueries: [ { query: PRODUCTS }, { query: PRODUCTS_BY_PK } ] })

    // useEffect
    useEffect(() => {
        if(product){
            console.log(product.products_by_pk);
            setData({
                title: product.products_by_pk.title,
                body_html: product.products_by_pk.body_html,
                main_image_url: product.products_by_pk.main_image_url,
                product_category_id: product.products_by_pk.product_category_id,
                price: product.products_by_pk.price
            });
        }
    }, [product]);

    // Start Function
    const headerHandler = () => {
        navigate("/product");
    }

    const inputHandler = (value, inputName) => {
        if(inputName === "main_image_url"){
            const file = value;
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                setData({ ...data, [inputName]: fileReader.result});
            });
            fileReader.readAsDataURL(file);
        }else{
            setData({ ...data, [inputName]: value });
        }

        if(error[inputName]){
            delete error[inputName];
            setError(error);
        }
    }

    const cancelHandler = () => {
        setData({
            title: product.products_by_pk.title,
            body_html: product.products_by_pk.body_html,
            main_image_url: product.products_by_pk.main_image_url,
            product_category_id: product.products_by_pk.product_category_id,
            price: product.products_by_pk.price
        });

        setError({});
    }

    const updateHandler = async () => {
        const newErrors = productFormValidation(data);
        setError(newErrors)

        if(Object.keys(newErrors).length === 0){
            try{
                setLoading(true);
                setLoadingText("Updating")
                await updateProduct({ variables: { id, data }  })

                toast("Product Updated Successfully.")
            }catch (e) {
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    }
    // End Function

    if(loading) return "Loading...."

    return (
        <>
            <Header headerHandler={headerHandler} category="Product" title="Edit"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload label="Upload Image" value={data.main_image_url}  error={error?.main_image_url} customFun={(e) => inputHandler(e.target.files[0], "main_image_url")}/>

                <FormInput label="Title" placeHolder="Enter Your Title" value={data.title} error={error?.title} customFun={(e) => inputHandler(e.target.value, "title")}/>

                <FormInput label="Price" placeHolder="Enter Your Price" value={data.price} error={error?.price} customFun={(e) => inputHandler(e.target.value, "price")}/>

                <FormSelect label="Category Type" error={error?.product_category_id} value={data.product_category_id} data={productCategory?.product_categories} customFun={(e) => inputHandler(e.target.value, "product_category_id")}/>


                <FormTextArea label="Description" placeHolder="Enter Your Description"  value={data.body_html} error={error?.body_html} customFun={(e) => inputHandler(e.target.value, "body_html")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={updateHandler} cancelText="Cancel" submitText="Update"/>
            </form>
        </>
    )
};

export default ProductEdit;