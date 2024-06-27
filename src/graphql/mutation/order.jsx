import {gql} from "@apollo/client";

export const UPDATE_ORDER_STATUS_BY_PK = gql`
mutation MyMutation($id: uuid!, $data: orders_set_input) {
  update_orders_by_pk(pk_columns: {id: $id}, _set: $data) {
    status
  }
}

`