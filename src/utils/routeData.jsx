import ProductLists from "../pages/product/ProductLists.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleNodes} from "@fortawesome/free-solid-svg-icons";

export const routeData = [
    {
        path: "/product",
        element: <ProductLists/>
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