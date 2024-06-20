import ProductLists from "../pages/product/ProductLists.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBasketShopping, faCircleNodes, faTable, faTableCells} from "@fortawesome/free-solid-svg-icons";
import ProductCreate from "../pages/product/ProductCreate.jsx";
import ProductEdit from "../pages/product/ProductEdit.jsx";
import ProductCategoryList from "../pages/category/ProductCategoryList.jsx";
import ProductCategoryCreate from "../pages/category/ProductCategoryCreate.jsx";
import ProductCategoryEdit from "../pages/category/ProductCategoryEdit.jsx";
import SubCategoryList from "../pages/subCategory/SubCategoryList.jsx";
import SubCategoryCreate from "../pages/subCategory/SubCategoryCreate.jsx";
import SubCategoryEdit from "../pages/subCategory/SubCategoryEdit.jsx";
import OrderLists from "../pages/order/OrderLists.jsx";
import OrderDetail from "../pages/order/OrderDetail.jsx";

export const routeData = [
    {
        path: "/product",
        element: <ProductLists/>
    },
    {
        path: "/product/create",
        element: <ProductCreate/>
    },
    {
        path: "/product/edit/:id",
        element: <ProductEdit/>
    },
    {
        path: "/category",
        element: <ProductCategoryList/>
    },
    {
        path: "/category/create",
        element: <ProductCategoryCreate/>
    },
    {
        path: "/category/edit/:id",
        element: <ProductCategoryEdit/>
    },
    {
        path: "/subcategory",
        element: <SubCategoryList/>
    },
    {
        path: "/subcategory/create",
        element: <SubCategoryCreate/>
    },
    {
        path: "/subcategory/edit/:id",
        element: <SubCategoryEdit/>
    },
    {
        path: "/order",
        element: <OrderLists/>
    },
    {
        path: "/order/detail/:id",
        element: <OrderDetail/>
    }
]

export const linkData = [
    {
        title: "Product",
        links: [
            {
                name: "Product List",
                path: "/product",
                icon: <FontAwesomeIcon icon={faCircleNodes} />
            },
            {
                name: "Category List",
                path: "/category",
                icon: <FontAwesomeIcon icon={faTable} />
            },
            {
                name: "Sub-Category List",
                path: "/subcategory",
                icon: <FontAwesomeIcon icon={faTableCells} />
            }
        ]
    },
    {
        title: "Order",
        links: [
            {
                name: "Order List",
                path: "/order",
                icon: <FontAwesomeIcon icon={faBasketShopping} />
            }
        ]
    }
]