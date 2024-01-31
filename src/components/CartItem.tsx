import { AxiosError } from "axios";
import { getProduct } from "../apis";
import { useQuery } from "react-query";
import { ErrorType, GetProductResponse, ProductDataType } from "../types";
import { Avatar, Col, Row, Tag, message } from "antd";
import { useState } from "react";
import { Loader, ProductQuantity } from ".";
import { Link } from "react-router-dom";
import { getProductPrice, getTotal } from "../utils";
import { MdDelete } from "react-icons/md";
import { useAppDispatch } from "../hooks/reduxHooks";
import { removeItem } from "../store/slices/cart";

interface PropType {
    productId: number;
    quantity: number;
    size: string;
}

const CartItem = ({ productId, quantity, size }: PropType) => {
    const [product, setProduct] = useState<ProductDataType | null>(null);
    const [productPrice, setProductPrice] = useState<number>(0);
    const [context, contextHolder] = message.useMessage();
    const dispatch = useAppDispatch();

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const handleOnSuccess = ({ data }: GetProductResponse) => {
        setProduct(data.product);
        setProductPrice(getProductPrice(data.product.prices, size));
    };

    const { isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => getProduct(productId),
        onSuccess: async ({ data }: GetProductResponse) =>
            handleOnSuccess({ data }),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    const removeProduct = () => {
        context.open({
            type: "success",
            content: "Item deleted successfully",
            duration: 3,
        });
        setTimeout(() => dispatch(removeItem({ productId })), 1000);
    };

    if (isLoading || !product) return <Loader />;
    return (
        <>
            {contextHolder}

            <Row className="border-b border-gray/20 py-8 flex items-center justify-center">
                <Col span={2} className="flex items-center justify-center">
                    <Avatar src={product.imageUrl} size="large" />
                </Col>

                <Col span={4} className="flex items-center justify-center">
                    <Link
                        to={`/product/${productId}`}
                        className="hover:text-active transition-all"
                    >
                        {product.name}
                    </Link>
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    <Tag className="rounded-full px-2" color="blue">
                        {size}
                    </Tag>
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    $ {productPrice}
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    <div>{quantity}</div>
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    <ProductQuantity
                        productId={Number(productId)}
                        quantity={quantity}
                    />
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    $ {getTotal(productPrice, quantity)}
                </Col>

                <Col span={3} className="flex items-center justify-center">
                    <button
                        onClick={() => removeProduct()}
                        className="text-red-400 rounded-md h-8 w-8 hover:text-red-500 transition-all "
                    >
                        <MdDelete />
                    </button>
                </Col>
            </Row>
        </>
    );
};

export default CartItem;
