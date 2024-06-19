import Header from "../../components/layout/Header.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import FormUpload from "../../components/form/FormUpload.jsx";
import FormInput from "../../components/form/FormInput.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {categoryFormValidation} from "../../utils/formValidation.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useMutation} from "@apollo/client";
import {INSERT_CATEGORY} from "../../graphql/mutation/category.jsx";
import {PRODUCT_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import useUploadFile from "../../utils/utils.jsx";

const ProductCategoryCreate = () => {
    const [getFileUrl] = useUploadFile();
    const navigate = useNavigate();
    // useState
    const [data, setData] = useState({
        category_name: "",
        category_level: 1,
        image_url: "",
        description: ""
    })
    const [error, setError] = useState({});
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api call
    const [insertCategory] = useMutation(INSERT_CATEGORY, { refetchQueries: [ { query: PRODUCT_CATEGORY_ALL }] });

    // Start Function
    const headerHandler = () => {
        navigate("/category");
    }

    const inputHandler = (value, inputName) => {
        if(inputName === "image_url"){
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
            category_name: "",
            category_level: 1,
            image_url: "",
            description: ""
        });

        setError({});
    }

    const submitHandler = async () => {
        const newErrors = categoryFormValidation(data);
        setError(newErrors)

        if(Object.keys(newErrors).length === 0){
            try{
                setLoading(true);
                setLoadingText("Creating")

                const imageUrl = await getFileUrl("products", data.image_url, "image");
                const formData = { ...data, image_url: imageUrl };
                await insertCategory({ variables: { data: formData }  })

                cancelHandler();
                toast("Category Created Successfully.")
                navigate("/category")
            }catch (e) {
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    }
    // End Function

    return(
        <>
            <Header headerHandler={headerHandler} category="Category" title="Create"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload value={data.image_url} error={error?.image_url} customFun={(e) => inputHandler(e.target.files[0], "image_url")}/>

                <FormInput label="Name *" placeHolder="Enter Category Name" value={data.category_name} error={error?.category_name} customFun={(e) => inputHandler(e.target.value, "category_name")}/>

                <FormTextArea label="Description *" placeHolder="Enter Your Description"  value={data.description} error={error?.description} customFun={(e) => inputHandler(e.target.value, "description")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={submitHandler} cancelText="Cancel" submitText="Submit"/>
            </form>
        </>
    )
};

export default ProductCategoryCreate;