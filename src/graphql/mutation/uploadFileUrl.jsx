import {gql} from "@apollo/client";

export const GET_FILE_UPLOAD_URL = gql`
mutation getFileUploadUrl($contentType: String!, $folder: String!) {
  getFileUploadUrl(content_type: $contentType, folder: $folder) {
    content_type
    error
    fileName
    fileUploadUrl
    message
  }
}
`;