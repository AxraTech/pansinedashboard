import ProductLists from "../pages/product/ProductLists.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNodes, faTable} from "@fortawesome/free-solid-svg-icons";
import ProductCreate from "../pages/product/ProductCreate.jsx";
import ProductEdit from "../pages/product/ProductEdit.jsx";
import ProductCategoryList from "../pages/productCategory/ProductCategoryList.jsx";
import ProductCategoryCreate from "../pages/productCategory/ProductCategoryCreate.jsx";
import ProductCategoryEdit from "../pages/productCategory/ProductCategoryEdit.jsx";

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
            }
        //     <FontAwesomeIcon icon="fa-solid fa-table-cells" />
        ]
    }
]