import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { Inertia } from "@inertiajs/inertia";

export default function UpdateProduct({ auth, products }) {
    const [values, setValues] = useState({
        name: products.name,
        description: products.description,
        price: products.price,
    });

    // const [name, setName] = useState([]);
    // const [description, setDescription] = useState([]);
    // const [price, setPrice] = useState([]);

    const [success, setSuccess] = useState("");

    // const handleChange = (e) => {
    //     setValues({
    //         ...values,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // const handleChange = (e) => {
    //     setValues({ ...values, name: e.target.value });
    //     setValues({ ...values, description: e.target.value });
    //     setValues({ ...values, price: e.target.value });
    // };

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value;
        setValues((values) => ({
            ...values,
            [key]: value,
        }));
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await Inertia.put(`/products/${products.id}`, values);
            setSuccess("Product updated successfully!");
            setValues({
                name: "",
                description: "",
                price: "",
            });
        } catch (error) {
            console.error(error);
        }
    }

    // useEffect(() => {
    //     setValues({
    //         name: products.name,
    //         description: products.description,
    //         price: products.price,
    //     });
    // }, []);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Products
                </h2>
            }
        >
            <Head title="Update Product" />

            {success && (
                <div
                    className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
                    role="alert"
                >
                    <span className="block sm:inline">{success}</span>
                    <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                        <svg
                            className="fill-current h-6 w-6 text-green-500"
                            role="button"
                            onClick={() => setSuccess("")}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                        >
                            <title>Close</title>
                            <path d="M14.348 5.652a.5.5 0 00-.707 0L10 9.293 6.357 5.652a.5.5 0 10-.707.707L9.293 10l-3.643 3.643a.5.5 0 10.707.707L10 10.707l3.643 3.643a.5.5 0 00.707-.707L10.707 10l3.641-3.648a.5.5 0 000-.707z" />
                        </svg>
                    </span>
                </div>
            )}

            <form
                method="POST"
                onSubmit={handleSubmit}
                className="max-w-md mx-auto"
            >
                <div className="mb-4 text-white">
                    <h1 className="text-center mt-10">Update a Product</h1>
                    <label
                        className="block text-white font-bold mb-2"
                        htmlFor="name"
                    >
                        Name
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="name"
                        type="text"
                        placeholder="Enter name"
                        value={values.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-4">
                    <label
                        className="block text-white font-bold mb-2"
                        htmlFor="description"
                    >
                        Description
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="description"
                        placeholder="Enter description"
                        value={values.description}
                        onChange={handleChange}
                    ></textarea>
                </div>
                <div className="mb-4">
                    <label
                        className="block text-white font-bold mb-2 "
                        htmlFor="price"
                    >
                        Price
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="price"
                        type="number"
                        placeholder="Enter price"
                        value={values.price}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Update
                    </button>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
