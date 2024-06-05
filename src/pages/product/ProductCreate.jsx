import FormInput from "../../components/form/FormInput.jsx";
import Header from "../../components/layout/Header.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";
import FormUpload from "../../components/form/FormUpload.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {useContext, useState} from "react";
import {productFormValidation} from "../../utils/formValidation.jsx";
import {INSERT_PRODUCTS_ONE} from "../../graphql/mutation/product.jsx";
import {PRODUCTS} from "../../graphql/query/product.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useNavigate} from "react-router-dom";

const ProductCreate = () => {
    // useState
    const [data, setData] = useState({
        title: "",
        body_html: "",
        main_image_url: "",
        product_category_id: "",
        price: ""
    });
    const [error, setError] = useState({});
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // useNavigate
    const navigate = useNavigate();
    // api call
    const { data: productCategory } = useQuery(PRODUCT_SUB_CATEGORY_ALL);
    const [insertProduct] = useMutation(INSERT_PRODUCTS_ONE, { refetchQueries: [ { query: PRODUCTS } ] })

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
    };


    const cancelHandler = () => {
        setData({
            title: "",
            body_html: "",
            main_image_url: "",
            product_category_id: "",
            price: ""
        });

        setError({});
    }

    const submitHandler = async () => {
        const newErrors = productFormValidation(data);
        setError(newErrors)

        if(Object.keys(newErrors).length === 0){
            try{
                setLoading(true);
                setLoadingText("Creating")
                await insertProduct({ variables: { data }  })

                cancelHandler();
                toast("Product Created Successfully.")
                navigate("/product")
            }catch (e) {
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    }
    // End Function

    return (
        <>
            <Header headerHandler={headerHandler} category="Product" title="Create"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload value={data.main_image_url} error={error?.main_image_url} customFun={(e) => inputHandler(e.target.files[0], "main_image_url")}/>

                <FormInput label="Title *" placeHolder="Enter Your Title" value={data.title} error={error?.title} customFun={(e) => inputHandler(e.target.value, "title")}/>

                <FormInput label="Price *" placeHolder="Enter Your Price" value={data.price} error={error?.price} customFun={(e) => inputHandler(e.target.value, "price")}/>

                <FormSelect label="Category Type *" error={error?.product_category_id} value={0} data={productCategory?.product_categories} customFun={(e) => inputHandler(e.target.value, "product_category_id")}/>

                <FormTextArea label="Description *" placeHolder="Enter Your Description"  value={data.body_html} error={error?.body_html} customFun={(e) => inputHandler(e.target.value, "body_html")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={submitHandler} cancelText="Cancel" submitText="Submit"/>
            </form>
        </>
    )
};

export default ProductCreate;