import {gql} from "@apollo/client";

export const UPDATE_PRODUCT_MEDIA_BY_PK = gql`
    mutation MyMutation($id: uuid!, $data: product_media_set_input!) {
      update_product_media_by_pk(pk_columns: {id: $id}, _set: $data) {
        id
      }
    }
`

export const DELETE_PRODUCT_MEDIA_BY_PK = gql`
mutation MyMutation($id: uuid!) {
  delete_product_media_by_pk(id: $id) {
    id
  }
}

`