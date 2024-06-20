import {gql} from "@apollo/client";

export const ORDERS = gql`
query MyQuery {
  orders(order_by: {created_at: desc}) {
    accepted_at
    canceled_at
    created_at
    customer_address
    customer_name
    customer_note
    customer_phone
    delivered_at
    delivering_at
    delivery_fee
    grand_total
    id
    items_total
    order_number
    payment_account_name
    payment_account_number
    payment_receipt_image_url
    status
    returned_at
    payment_service_name
    user {
      id
      name
      email
    }
  }
}
`

export const ORDER_BY_PK = gql`
query MyQuery($id: uuid = "") {
  orders_by_pk(id: $id) {
    accepted_at
    canceled_at
    created_at
    customer_address
    customer_name
    customer_note
    customer_phone
    delivered_at
    delivering_at
    delivery_fee
    grand_total
    id
    items_total
    order_items {
      id
      item_price
      quantity
      sub_total
      product {
        id
        title
      }
    }
    order_number
    payment_account_name
    payment_account_number
    payment_receipt_image_url
    payment_service_name
    returned_at
    status
    user {
      name
      email
    }
  }
}

`