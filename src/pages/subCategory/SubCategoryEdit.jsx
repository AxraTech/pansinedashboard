import Header from "../../components/layout/Header.jsx";
import {useNavigate, useParams} from "react-router-dom";
import FormUpload from "../../components/form/FormUpload.jsx";
import FormInput from "../../components/form/FormInput.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {subCategoryFormValidation} from "../../utils/formValidation.jsx";
import {toast} from "react-toastify";
import {useContext, useEffect, useState} from "react";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {CATEGORY_BY_PK, PRODUCT_CATEGORY_ALL, PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import {UPDATE_CATEGORY_BY_PK} from "../../graphql/mutation/category.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";
import useUploadFile from "../../utils/utils.jsx";
import { LoadingAnimation } from "../../components/LoadingAnimate.jsx";

const SubCategoryEdit = () => {
    const [getFileUrl] = useUploadFile();
    const navigate = useNavigate();
    const { id } = useParams();
    // useState
    const [data, setData] = useState({
        category_name: "",
        category_level: 1,
        image_url: "",
        parent_category_id: "",
        description: ""
    })
    const [error, setError] = useState({});
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // api call
    const {loading, data: categoryData} = useQuery(CATEGORY_BY_PK, { variables: { id }})
    const {data: category} = useQuery(PRODUCT_CATEGORY_ALL);
    const [updateCategoryByPk] = useMutation(UPDATE_CATEGORY_BY_PK, { refetchQueries: [ { query: CATEGORY_BY_PK, variables: { id } }, { query: PRODUCT_SUB_CATEGORY_ALL } ]})

    useEffect(() => {
        if(categoryData){
            setData({
                category_name: categoryData.product_categories_by_pk.category_name,
                category_level: categoryData.product_categories_by_pk.category_level,
                image_url: categoryData.product_categories_by_pk.image_url,
                parent_category_id: categoryData.product_categories_by_pk.parent_category_id,
                description: categoryData.product_categories_by_pk.description
            })
        }
    }, [categoryData]);

    // Start Function
    const headerHandler = () => {
        navigate("/subcategory");
    };

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
            category_name: category.product_categories_by_pk.category_name,
            category_level: category.product_categories_by_pk.category_level,
            image_url: category.product_categories_by_pk.image_url,
            description: category.product_categories_by_pk.description
        });

        setError({});
    }

    const updateHandler = async () => {
        const newErrors = subCategoryFormValidation(data);
        setError(newErrors)

        if(Object.keys(newErrors).length === 0){
            try{
                setLoading(true);
                setLoadingText("Updating")

                let formData = { ...data } ;
                if(formData.image_url !== categoryData.product_categories_by_pk.image_url){
                    formData.image_url = await getFileUrl("products", data.image_url, "image");
                }
                await updateCategoryByPk({ variables: { id, data: formData }  })

                toast("Sub-Category Updated Successfully.")
            }catch (e) {
                console.log(e.message);
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    }
    // End Function

    if(loading) return <LoadingAnimation/>

    return(
        <>
            <Header headerHandler={headerHandler} category="Sub-Category" title="Edit"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload value={data.image_url} error={error?.image_url} customFun={(e) => inputHandler(e.target.files[0], "image_url")}/>

                <FormInput label="Name *" placeHolder="Enter Category Name" value={data.category_name} error={error?.category_name} customFun={(e) => inputHandler(e.target.value, "category_name")}/>

                <FormSelect label="Category Type *" value={data.parent_category_id} error={error?.parent_category_id} data={category?.product_categories} customFun={(e) => inputHandler(e.target.value, "parent_category_id")}/>

                <FormTextArea label="Description *" placeHolder="Enter Your Description"  value={data.description} error={error?.description} customFun={(e) => inputHandler(e.target.value, "description")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={updateHandler} cancelText="Cancel" submitText="Update"/>
            </form>
        </>
    )
};

export default SubCategoryEdit;