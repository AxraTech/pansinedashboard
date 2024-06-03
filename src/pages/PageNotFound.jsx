import {useNavigate} from "react-router-dom";

const PageNotFound = () => {
    const navigate = useNavigate();

    return (
        <section className="h-screen">
            <div className="py-8 px-4 mx-auto my-auto max-w-screen-xl h-screen lg:py-16 lg:px-6 flex flex-col justify-center items-center">
                <div className="w-1/2 text-center align-middle">
                    <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">404</h1>

                    <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">Something's missing.</p>

                    <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => navigate("/product")}>
                        Back to Homepage
                    </button>
                </div>
            </div>
        </section>
    )
}

export default PageNotFound;