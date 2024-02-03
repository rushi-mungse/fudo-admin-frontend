import { useEffect, useState } from "react";
import { Table, message } from "antd";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getProducts } from "../../apis";
import { ProductTableColumn } from "../../TableColumns";
import {
    ErrorType,
    ProductDataType,
    ProductQuery,
    ProductResponse,
} from "../../types";
import { PER_PAGE } from "../../constants";

interface PropType {
    query: ProductQuery;
}

const ProductList = ({ query }: PropType) => {
    const [productData, setProductData] = useState<ProductDataType[]>([]);
    const [context, contextHolder] = message.useMessage();
    const [totalCount, setTotalCount] = useState<number>(0);
    const [queryParams, setQueryParams] = useState({
        perPage: PER_PAGE,
        currentPage: 1,
    });

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const { isFetching } = useQuery({
        queryKey: ["getProducts", queryParams],
        queryFn: async () => {
            const data = queryParams as unknown as Record<string, string>;
            const queryString = new URLSearchParams(data).toString();
            return getProducts(queryString);
        },
        onSuccess: async ({ data }: ProductResponse) => {
            setTotalCount(data.totalCount);
            setProductData(data.products);
        },
        onError: async (err: AxiosError) => handleOnError(err),
        keepPreviousData: true,
    });

    useEffect(() => {
        setQueryParams((prev) => {
            return { ...prev, ...query };
        });
    }, [query]);

    return (
        <>
            {contextHolder}
            <Table
                bordered
                columns={ProductTableColumn}
                pagination={{
                    total: totalCount,
                    current: queryParams.currentPage,
                    pageSize: queryParams.perPage,
                    onChange: (page) => {
                        setQueryParams((prev) => {
                            return { ...prev, currentPage: page };
                        });
                    },
                }}
                dataSource={productData}
                loading={isFetching}
                rowKey="id"
            />
        </>
    );
};

export default ProductList;
