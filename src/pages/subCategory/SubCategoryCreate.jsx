import Header from "../../components/layout/Header.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import FormUpload from "../../components/form/FormUpload.jsx";
import FormInput from "../../components/form/FormInput.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {subCategoryFormValidation} from "../../utils/formValidation.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {INSERT_CATEGORY} from "../../graphql/mutation/category.jsx";
import {PRODUCT_CATEGORY_ALL, PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";

const SubCategoryCreate = () => {
    const navigate = useNavigate();
    // useState
    const [data, setData] = useState({
        category_name: "",
        category_level: 2,
        image_url: "",
        parent_category_id: "",
        description: ""
    })
    const [error, setError] = useState({});
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api call
    const {data: category} = useQuery(PRODUCT_CATEGORY_ALL);
    const [insertCategory] = useMutation(INSERT_CATEGORY, { refetchQueries: [ { query: PRODUCT_SUB_CATEGORY_ALL }] });

    // Start Function
    const headerHandler = () => {
        navigate("/subcategory");
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
        const newErrors = subCategoryFormValidation(data);
        setError(newErrors)

        if(Object.keys(newErrors).length === 0){
            try{
                setLoading(true);
                setLoadingText("Creating")
                await insertCategory({ variables: { data }  })

                cancelHandler();
                toast("Sub-Category Created Successfully.")
                navigate("/subcategory")
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
            <Header headerHandler={headerHandler} category="Sub-Category" title="Create"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload value={data.image_url} error={error?.image_url} customFun={(e) => inputHandler(e.target.files[0], "image_url")}/>

                <FormInput label="Name *" placeHolder="Enter Category Name" value={data.category_name} error={error?.category_name} customFun={(e) => inputHandler(e.target.value, "category_name")}/>

                <FormSelect label="Category Type *" error={error?.parent_category_id} value={0} data={category?.product_categories} customFun={(e) => inputHandler(e.target.value, "parent_category_id")}/>

                <FormTextArea label="Description *" placeHolder="Enter Your Description"  value={data.description} error={error?.description} customFun={(e) => inputHandler(e.target.value, "description")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={submitHandler} cancelText="Cancel" submitText="Submit"/>
            </form>
        </>
    )
};

export default SubCategoryCreate;