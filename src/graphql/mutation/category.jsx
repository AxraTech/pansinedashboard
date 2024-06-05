import {gql} from "@apollo/client";

export const INSERT_CATEGORY = gql`
mutation MyMutation($data: product_categories_insert_input!) {
  insert_product_categories_one(object: $data) {
    id
  }
}
`

export const UPDATE_CATEGORY_BY_PK = gql`
mutation MyMutation($id: uuid!, $data: product_categories_set_input!) {
  update_product_categories_by_pk(pk_columns: {id: $id}, _set: $data) {
    id
  }
}

`

export const DELETE_CATEGORY_BY_PK = gql`
mutation MyMutation($id: uuid!) {
  delete_product_categories_by_pk(id: $id) {
    id
  }
}
`;

