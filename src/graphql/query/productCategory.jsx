import {gql} from "@apollo/client";

export const PRODUCT_CATEGORY_ALL = gql`
    query MyQuery {
          product_categories(order_by: {created_at: desc}) {
            id
            category_name
            category_level
          }
       }
`;
