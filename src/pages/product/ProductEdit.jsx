import FormInput from "../../components/form/FormInput.jsx";
import Header from "../../components/layout/Header.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";
import FormUpload from "../../components/form/FormUpload.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {useContext, useEffect, useState} from "react";
import {mediaFormValidation, productFormValidation} from "../../utils/formValidation.jsx";
import {INSERT_PRODUCT_MEDIA_ONE, UPDATE_PRODUCT_BY_PK} from "../../graphql/mutation/product.jsx";
import {PRODUCTS, PRODUCTS_BY_PK} from "../../graphql/query/product.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useNavigate, useParams} from "react-router-dom";
import Button from "../../components/Button.jsx";
import FormTwoUploads from "../../components/form/FormTwoUploads.jsx";
import Table from "../../components/table/Table.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import {mediaHeader} from "./ProductCreate.jsx";
import {DELETE_PRODUCT_MEDIA_BY_PK, UPDATE_PRODUCT_MEDIA_BY_PK} from "../../graphql/mutation/productMedia.jsx";
import useUploadFile from "../../utils/utils.jsx";

const ProductEdit = () => {
    const [getFileUrl] = useUploadFile();
    // useState
    const [data, setData] = useState({
        title: "",
        body_html: "",
        main_image_url: "",
        product_category_id: "",
        price: ""
    });
    const [error, setError] = useState({});
    const [showMediaForm, setShowMediaForm] = useState(false);
    const [mediaDatas, setMediaDatas] = useState([]);
    const [mediaData, setMediaData] = useState({
        media_url: "",
        video_thumbnail_url: "",
        media_type: ""
    });
    const [editId, setEditId] = useState("");
    const [mediaError, setMediaError] = useState({});
    const { id } = useParams();
    // useContext
    const { setLoading, setLoadingText } = useContext(LoadingContext);
    // useNavigate
    const navigate = useNavigate();
    // api call
    const { loading, data: product } = useQuery(PRODUCTS_BY_PK, { variables: { id }});
    const { data: productCategory } = useQuery(PRODUCT_SUB_CATEGORY_ALL);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_BY_PK, { refetchQueries: [ { query: PRODUCTS }, { query: PRODUCTS_BY_PK , variables: { id }  } ] })
    const [insertProductMedia] = useMutation(INSERT_PRODUCT_MEDIA_ONE, { refetchQueries: [ { query: PRODUCTS_BY_PK , variables: { id }  }] });
    const [updateProductMedia] = useMutation(UPDATE_PRODUCT_MEDIA_BY_PK, { refetchQueries: [ { query: PRODUCTS_BY_PK , variables: { id }  }] })
    const [deleteProductMedia] = useMutation(DELETE_PRODUCT_MEDIA_BY_PK, { refetchQueries: [ { query: PRODUCTS_BY_PK , variables: { id }  }] })

    // useEffect
    useEffect(() => {
        if(product){
            console.table(product.products_by_pk);
            setData({
                title: product.products_by_pk.title,
                body_html: product.products_by_pk.body_html,
                main_image_url: product.products_by_pk.main_image_url,
                product_category_id: product.products_by_pk.product_category_id,
                price: product.products_by_pk.price
            });

            setMediaDatas(product.products_by_pk.product_media);
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

                let formData = { ...data } ;
                if(data.main_image_url !== product.products_by_pk.main_image_url){
                    formData.main_image_url = await getFileUrl("products", data.main_image_url, "image");
                }
                await updateProduct({ variables: { id, data: formData }  })

                toast("Product Updated Successfully.")
            }catch (e) {
                console.log(e.message);
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    }

    /* start product media input*/
    const addMediaHandler = () => {
        setShowMediaForm(true);
    };

    const mediaInputHandler = (value, inputName) => {
        if(inputName === "media_url" || inputName === "video_thumbnail_url"){
            const file = value;
            const fileReader = new FileReader();
            fileReader.addEventListener("load", () => {
                setMediaData({ ...mediaData, [inputName]: fileReader.result});
            });
            fileReader.readAsDataURL(file);
        }else{
            setMediaData({ ...mediaData, [inputName]: value });
        }

        if(mediaError[inputName]){
            delete mediaError[inputName];
            setMediaError(error);
        }
    }

    const mediaCancelHandler = () => {
        setMediaData({
            media_url: "",
            video_thumbnail_url: "",
            media_type: ""
        });
        setMediaError({});
        setEditId("");
    }

    const mediaSubmitHandler = async () => {
        const newErrors = mediaFormValidation(mediaData);
        setMediaError(newErrors)

        if(Object.keys(newErrors).length === 0) {
            try{
                setLoading(true);
                if(editId !== ""){
                        setLoadingText("Updating Product Media");
                        const data = mediaData;
                        delete data.__typename;
                        await updateProductMedia({ variables: { id: data.id, data: data }})
                        toast("Product Media update successful");
                }else{
                    setLoadingText("Inserting Product Media");
                    const data = { ...mediaData, product_id: id };
                    console.log(data);
                    await insertProductMedia({ variables: { data }})
                    toast("Product Media insert successful");
                }
            }catch (e) {
                toast(e.message)
            }finally {
                setLoading(false);
            }
            mediaCancelHandler();
        }

    }

    const editMediaHandler = (id) => {
        setShowMediaForm(true);
        setMediaData(mediaDatas[id]);
        setEditId(id);
    }

    const deleteMediaHandler = async (id) => {
        // const copArr = [ ...mediaDatas ];
        // copArr.splice(id, 1);
        // setMediaDatas(copArr);

        try {
            setLoading(true);
            setLoadingText("Deleting Product Media");
            await deleteProductMedia({variables: {id}})
            toast("Product Media delete successful");
        } catch (e) {
            toast(e.message)
        } finally {
            setLoading(false);
        }
    }
    /* end product media input*/
    // End Function

    if(loading) return "Loading...."

    return (
        <>
            <Header headerHandler={headerHandler} category="Product" title="Edit"/>

            <form className="grid grid-cols-12 gap-2">
                <FormUpload label="Upload Image" value={data.main_image_url} error={error?.main_image_url}
                            customFun={(e) => inputHandler(e.target.files[0], "main_image_url")}/>

                <FormInput label="Title" placeHolder="Enter Your Title" value={data.title} error={error?.title}
                           customFun={(e) => inputHandler(e.target.value, "title")}/>

                <FormInput label="Price" placeHolder="Enter Your Price" value={data.price} error={error?.price}
                           customFun={(e) => inputHandler(e.target.value, "price")}/>

                <FormSelect label="Category Type" error={error?.product_category_id} value={data.product_category_id}
                            data={productCategory?.product_categories}
                            customFun={(e) => inputHandler(e.target.value, "product_category_id")}/>


                <FormTextArea label="Description" placeHolder="Enter Your Description" value={data.body_html}
                              error={error?.body_html} customFun={(e) => inputHandler(e.target.value, "body_html")}/>

                <FormButton processing={false} cancelHandler={cancelHandler} submitHandler={updateHandler}
                            cancelText="Cancel" submitText="Update"/>
            </form>

            <hr className="shadow-md"/>

            {/*Start Media */}
            <div className="my-5">
                <div className="flex mb-3">
                    <p className="text-2xl font-extrabold tracking-tight text-slate-900 mr-5">Media</p>

                    <Button title="Create" customFun={addMediaHandler}/>
                </div>

                {
                    showMediaForm &&
                    <form className="grid grid-cols-12 gap-2 border-y-2 my-5 py-2">
                        <FormTwoUploads label1="upload1" label2="upload2" value1={mediaData.media_url}
                                        value2={mediaData.video_thumbnail_url} error1={mediaError?.media_url}
                                        error2={mediaError?.video_thumbnail_url}
                                        customFun1={(e) => mediaInputHandler(e.target.files[0], "media_url")}
                                        customFun2={(e) => mediaInputHandler(e.target.files[0], "video_thumbnail_url")}/>

                        <FormInput label="Media Type *" placeHolder="Enter Your Media Type" value={mediaData.media_type}
                                   error={mediaError?.media_type}
                                   customFun={(e) => mediaInputHandler(e.target.value, "media_type")}/>

                        <FormButton processing={false} cancelHandler={mediaCancelHandler}
                                    submitHandler={mediaSubmitHandler} cancelText="Cancel" submitText="Submit"/>
                    </form>
                }

                <Table tableHeader={mediaHeader} data={mediaDatas}>
                    {
                        mediaDatas.map((data, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={index}>
                                <td className="px-6 py-4">
                                    <img src={data.media_url} className="w-14 h-14 rounded-full" alt="image"/>
                                </td>
                                <td className="px-6 py-4">
                                    {data.media_type}
                                </td>
                                <td className="px-6 py-4">
                                    <TableButton color={"bg-blue-500"} hoverColor={"hover:bg-blue-700"}
                                                 customFun={() => editMediaHandler(index)}><FontAwesomeIcon
                                        icon={faPenToSquare}/></TableButton>
                                    <TableButton color={"bg-red-500"} hoverColor={"hover:bg-red-700"}
                                                 customFun={() => deleteMediaHandler(data.id)}><FontAwesomeIcon
                                        icon={faTrash}/></TableButton>
                                </td>
                            </tr>
                        ))
                    }
                </Table>
            </div>
            {/*End Media */}
        </>
    )
};

export default ProductEdit;