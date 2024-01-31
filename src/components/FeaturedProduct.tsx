import { Link } from "react-router-dom";
import ProductCard from "../ui/ProductCard";
import { ErrorType, ProductDataType, ProductResponse } from "../types";
import { useState } from "react";
import { message } from "antd";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getProducts } from "../apis";
import { Loader } from "./";
import { PER_PAGE } from "../constants";

const FeaturedProduct = () => {
    const [productData, setProductData] = useState<ProductDataType[]>([]);
    const [context, contextHolder] = message.useMessage();

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const { isLoading } = useQuery({
        queryKey: ["getProducts"],
        queryFn: async () => {
            const queryParams = { currentPage: 1, perPage: PER_PAGE };
            const data = queryParams as unknown as Record<string, string>;
            const queryString = new URLSearchParams(data).toString();
            return getProducts(queryString);
        },
        onSuccess: async ({ data }: ProductResponse) =>
            setProductData(data.products),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    return (
        <div className="min-h-screen min-w-screen">
            {contextHolder}
            <div className="container mx-auto">
                <div className="flex items-center justify-between">
                    <h1 className="text-4xl tracking-wider leading-20 font-semibold text-dark/90">
                        Our Featured Food
                    </h1>
                    <Link to="/menu">
                        <span className="text-active hover:text-active/80 text-sm">
                            See all Food ⭢
                        </span>
                    </Link>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-16 container mx-auto py-8">
                {isLoading ? (
                    <Loader />
                ) : (
                    productData.map((product) => {
                        return (
                            <ProductCard product={product} key={product.id} />
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default FeaturedProduct;
