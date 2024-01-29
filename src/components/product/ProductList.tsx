import { useState } from "react";
import { Table, message } from "antd";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getProducts } from "../../apis";
import { ProductTableColumn } from "../../TableColumns";
import { ErrorType, ProductDataType, ProductResponse } from "../../types";

const ProductList: React.FC = () => {
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
        queryFn: async () => getProducts(),
        onSuccess: async ({ data }: ProductResponse) =>
            setProductData(data.products),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    return (
        <>
            {contextHolder}
            <Table
                bordered
                columns={ProductTableColumn}
                pagination={{ position: ["bottomRight"] }}
                dataSource={productData}
                loading={isLoading}
                rowKey="id"
            />
        </>
    );
};

export default ProductList;
