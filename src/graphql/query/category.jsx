import {gql} from "@apollo/client";

export const PRODUCT_CATEGORY_ALL = gql`
    query MyQuery {
      product_categories(order_by: {created_at: desc}, where: {parent_category_id: {_is_null: true}}) {
        id
        category_name
        category_level
        image_url
        description
      }
    }
`;

export const PRODUCT_SUB_CATEGORY_ALL = gql`
    query MyQuery {
      product_categories(order_by: {created_at: desc}, where: {parent_category_id: {_is_null: false}}) {
        id
        category_name
        category_level
        image_url
        description
        parent_category_id
      }
    }
`;

export const CATEGORY_BY_PK = gql`
query MyQuery($id: uuid!) {
  product_categories_by_pk(id: $id) {
    category_level
    category_name
    description
    image_url
    parent_category_id
  }
}

`


