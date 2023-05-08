import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { InertiaLink } from "@inertiajs/inertia-react";
import { Inertia } from "@inertiajs/inertia";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Index({ products, auth }) {
    const [product, setProducts] = useState([]);

    useEffect(() => {
        setProducts(products);
    }, []);

    const editProduct = (product) => {
        Inertia.visit(`/products/${product.id}/edit`);
    };

    const handleDelete = (p) => {
        const productId = p.id;
        axios
            .delete(`/products/${productId}`)
            .then((response) => {
                console.log(response.data.message);
                setProducts(product.filter((p) => p.id !== productId));
                console.log(product);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Product" />

            <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="mb-4 text-center">
                    <InertiaLink
                        href="/products/create"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Create Product
                    </InertiaLink>
                </div>

                {product.length > 0 ? (
                    <table className="table-fixed">
                        <thead className="text-white">
                            <tr>
                                <th className="w-1/3 px-4 py-2">Name</th>
                                <th className="w-1/3 px-4 py-2">Description</th>
                                <th className="w-1/3 px-4 py-2">Price</th>
                                <th className="w-1/3 px-4 py-2">Action</th>
                            </tr>
                        </thead>
                        <tbody className="text-white">
                            {product.map((product) => (
                                <tr key={product.id}>
                                    <td className="border px-4 py-2">
                                        {product.name}
                                    </td>
                                    <td className="border px-4 py-2">
                                        {product.description}
                                    </td>
                                    <td className="border px-4 py-2">
                                        &#8369; {product.price}
                                    </td>
                                    <td className="border px-4 py-2">
                                        <div className="flex justify-center space-x-2">
                                            <button
                                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() =>
                                                    editProduct(product)
                                                }
                                            >
                                                Edit
                                            </button>
                                            <button
                                                type="button"
                                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                                                onClick={() =>
                                                    handleDelete(product)
                                                }
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
