import {gql} from "@apollo/client";

export  const PRODUCTS = gql`
    query MyQuery {
      products(order_by: {created_at: desc}) {
        body_html
        id
        main_image_url
        price
        title
        product_category {
          category_name
        }
        created_at
      }
    }
    `