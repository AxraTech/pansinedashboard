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
    `;

export const PRODUCTS_BY_PK = gql`
query MyQuery($id: uuid!) {
  products_by_pk(id: $id) {
    body_html
    disabled
    id
    main_image_url
    price
    product_category_id
    title
    product_category {
      category_name
    }
  }
}
`