import ProductLists from "../pages/product/ProductLists.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNodes} from "@fortawesome/free-solid-svg-icons";
import ProductCreate from "../pages/product/ProductCreate.jsx";
import ProductEdit from "../pages/product/ProductEdit.jsx";

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
            }
        ]
    }
]