import {gql} from "@apollo/client";

export const INSERT_PRODUCTS_ONE = gql`
    mutation MyMutation($data: products_insert_input!) {
      insert_products_one(object: $data) {
        id
      }
    }
`;

export const INSERT_PRODUCT_MEDIA_ONE = gql`
mutation MyMutation($data: product_media_insert_input!) {
  insert_product_media_one(object: $data) {
    id
  }
}

`

export const UPDATE_PRODUCT_BY_PK = gql`
    mutation MyMutation($id: uuid!, $data: products_set_input!) {
      update_products_by_pk(pk_columns: {id: $id}, _set: $data) {
        id
      }
    }
`

export const DELETE_PRODUCT_BY_PK = gql`
    mutation MyMutation($id: uuid!) {
      delete_products_by_pk(id: $id) {
        id
      }
    }
`
