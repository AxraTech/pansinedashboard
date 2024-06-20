import {useMutation} from "@apollo/client";
import {GET_FILE_UPLOAD_URL} from "../graphql/mutation/uploadFileUrl.jsx";

export const uploadFile = async (file, fileUploadUrl, contentType) => {
    try {
        const fileUri = await fetch(file);
        const blob = await fileUri.blob();
        const uploadedImageUrl = await fetch(fileUploadUrl, {
            method: "PUT",
            headers: {
                "Content-Type": `${contentType}/*`,
                "x-amz-acl": "public-read",
            },
            body: blob,
        });
        return uploadedImageUrl.url.split("?")[0];
    } catch (e) {
        alert(e)
        throw new Error(e)
    }
};

const useUploadFile = () => {
    const [getFileUploadUrl] = useMutation(GET_FILE_UPLOAD_URL);

    const getFileUrl = async (folderName, data, contentType) => {
        const fileUploadUrl = await getFileUploadUrl(({
            variables: {
                contentType: contentType,
                folder: folderName
            },
        }));
        const uploadedFileUrl = await uploadFile(data, fileUploadUrl.data.getFileUploadUrl.fileUploadUrl, contentType);

        return uploadedFileUrl;
    }

    return [getFileUrl];
};

export default useUploadFile;