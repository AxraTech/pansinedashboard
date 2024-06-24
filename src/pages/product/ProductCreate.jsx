import FormInput from "../../components/form/FormInput.jsx";
import Header from "../../components/layout/Header.jsx";
import FormSelect from "../../components/form/FormSelect.jsx";
import FormUpload from "../../components/form/FormUpload.jsx";
import {useMutation, useQuery} from "@apollo/client";
import {PRODUCT_SUB_CATEGORY_ALL} from "../../graphql/query/category.jsx";
import FormTextArea from "../../components/form/FormTextArea.jsx";
import FormButton from "../../components/form/FormButton.jsx";
import {useContext, useState} from "react";
import {mediaFormValidation, productFormValidation} from "../../utils/formValidation.jsx";
import {INSERT_PRODUCTS_ONE} from "../../graphql/mutation/product.jsx";
import {PRODUCTS} from "../../graphql/query/product.jsx";
import {toast} from "react-toastify";
import LoadingContext from "../../contexts/LoadingContext.jsx";
import {useNavigate} from "react-router-dom";
import Button from "../../components/Button.jsx";
import Table from "../../components/table/Table.jsx";
import FormTwoUploads from "../../components/form/FormTwoUploads.jsx";
import TableButton from "../../components/table/TableButton.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPenToSquare, faTrash} from "@fortawesome/free-solid-svg-icons";
import useUploadFile from "../../utils/utils.jsx";

export const mediaHeader = ["Video", "Thumbnail", "Type", "Action"]

const ProductCreate = () => {
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

    /* start product input*/
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

                // for mediaData upload
                const newMediaDatas = [];
                for (const eachData of mediaDatas) {
                    const videoUrl = await getFileUrl("products", eachData.media_url, "video");
                    const thumbnailUrl = await getFileUrl("products", eachData.video_thumbnail_url, "image");

                    newMediaDatas.push({
                        ...eachData,
                        media_url: videoUrl,
                        video_thumbnail_url: thumbnailUrl
                    })
                }

                const imageUrl = await getFileUrl("products", data.main_image_url, "image");
                const formData = { ...data, main_image_url: imageUrl, product_media: { data: newMediaDatas } }

                // product_media
                await insertProduct({variables: { data: formData }})

                cancelHandler();
                toast("Product Created Successfully.")
                navigate("/product")
            }catch (e) {
                toast(e.message)
            }finally {
                setLoading(false);
            }
        }

    };

    /* end product input*/

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

    const mediaSubmitHandler = () => {
        const newErrors = mediaFormValidation(mediaData);
        setMediaError(newErrors)

        if(Object.keys(newErrors).length === 0) {
            if(editId !== ""){
                const copArr = [ ...mediaDatas ];
                copArr[editId] = mediaData;
                setMediaDatas(copArr);
                setEditId("");
            }else{
                setMediaDatas([ ...mediaDatas, mediaData ]);
            }
            mediaCancelHandler();
        }

    }

    const editMediaHandler = (id) => {
        setShowMediaForm(true);
        setMediaData(mediaDatas[id]);
        setEditId(id);
    }

    const deleteMediaHandler = (id) => {
        const copArr = [ ...mediaDatas ];
        copArr.splice(id, 1);
        setMediaDatas(copArr);
    }
    /* end product media input*/

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
                            <FormTwoUploads label1="upload1" label2="upload2" value1={mediaData.media_url} value2={mediaData.video_thumbnail_url} error1={mediaError?.media_url} error2={mediaError?.video_thumbnail_url} customFun1={(e) => mediaInputHandler(e.target.files[0], "media_url")} customFun2={(e) => mediaInputHandler(e.target.files[0], "video_thumbnail_url")}/>

                            <FormInput label="Media Type *" placeHolder="Enter Your Media Type" value={mediaData.media_type} error={mediaError?.media_type} customFun={(e) => mediaInputHandler(e.target.value, "media_type")}/>

                            <FormButton processing={false} cancelHandler={mediaCancelHandler} submitHandler={mediaSubmitHandler} cancelText="Cancel" submitText="Submit"/>
                    </form>
                }

                <Table tableHeader={mediaHeader} data={mediaDatas}>
                    {
                        mediaDatas.map( (data, index) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                key={index}>
                                <td className="px-6 py-4">
                                    <video src={data.media_url} className="w-14 h-14 rounded-full"/>
                                </td>
                                <td className="px-6 py-4">
                                    <img src={data.video_thumbnail_url} className="w-14 h-14 rounded-full" alt="image"/>
                                </td>
                                <td className="px-6 py-4">
                                    {data.media_type}
                                </td>
                                <td className="px-6 py-4">
                                    <TableButton color={"bg-blue-500"} hoverColor={"hover:bg-blue-700"}
                                                 customFun={() => editMediaHandler(index)}><FontAwesomeIcon
                                        icon={faPenToSquare}/></TableButton>
                                    <TableButton color={"bg-red-500"} hoverColor={"hover:bg-red-700"}
                                                 customFun={() => deleteMediaHandler(index)}><FontAwesomeIcon
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

export default ProductCreate;