import { useState } from "react";
import { useParams } from "react-router-dom";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { getProduct } from "../../apis";
import {
    ErrorType,
    GetProductResponse,
    ProductDataType,
    ProductSizeAndPriceType,
} from "../../types";
import {
    message,
    Image,
    Rate,
    Radio,
    Card,
    Col,
    Typography,
    Badge,
    Button,
} from "antd";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { addProduct } from "../../store/slices/cart";
import { getProductSizeWithPrice, getTotal } from "../../utils";
import { GoBack, Loader } from "../";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";

const SingleProduct = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState<ProductDataType>();
    const [context, contextHolder] = message.useMessage();
    const [proudctSize, setProductSize] = useState<
        "small" | "medium" | "large"
    >("small");
    const [quantity, setQuantity] = useState<number>(0);
    const [productSizePrice, setProductSizePrice] =
        useState<ProductSizeAndPriceType>();
    const dispatch = useAppDispatch();

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const handleProductQuantity = (add: number) => {
        if (!quantity && add == -1) {
            setQuantity(0);
            return;
        }
        setQuantity((prev) => prev + add);
    };

    const addToCart = () => {
        if (!quantity)
            return context.open({
                type: "error",
                content: "Please add items quantity",
                duration: 3,
            });

        dispatch(addProduct({ productId: Number(productId), quantity }));

        context.open({
            type: "success",
            content: `${quantity} item added successfully.`,
            duration: 3,
        });

        setQuantity(0);
    };

    /** get product http request */
    const { isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => getProduct(Number(productId)),
        onSuccess: async ({ data }: GetProductResponse) => {
            setProduct(data.product);
            setProductSizePrice(getProductSizeWithPrice(data.product.prices));
        },
        onError: async (err: AxiosError) => handleOnError(err),
    });

    if (isLoading || !product || !productSizePrice)
        return (
            <div className="h-full w-full flex items-center justify-center">
                <Loader />
            </div>
        );

    return (
        <div className="pt-24 mx-auto container">
            {contextHolder}
            <GoBack />
            <div className="grid grid-cols-2">
                <div className="flex items-center justify-center">
                    <Image src={product.imageUrl} height={400} />
                </div>

                <div className="w-[400px] p-10 shadow-sm shadow-pure/30 rounded-lg">
                    <Badge.Ribbon text={`${product.discount}% off`}>
                        <h1 className="text-active text-2xl p-0 m-0">
                            {product.name}
                        </h1>

                        <div>
                            <Rate
                                defaultValue={4}
                                className="text-sm"
                                disabled
                            />
                            <span className="text-red-300 ml-2 text-xs">
                                (4)
                            </span>
                        </div>

                        <p className="mt-8 italic tracking-wider text-sm">
                            {product.description}
                        </p>

                        <Card className="w-fit mt-8 bg-activeLight">
                            <Typography.Paragraph className="text-active font-semibold">
                                Product Price
                            </Typography.Paragraph>

                            <Col>
                                <Radio.Group
                                    value={proudctSize}
                                    onChange={(e) =>
                                        setProductSize(e.target.value)
                                    }
                                >
                                    <Radio.Button
                                        value="small"
                                        style={{ width: 90 }}
                                    >
                                        Small
                                    </Radio.Button>
                                    <Radio.Button
                                        value="medium"
                                        style={{ width: 90 }}
                                    >
                                        Medium
                                    </Radio.Button>
                                    <Radio.Button
                                        value="large"
                                        style={{ width: 90 }}
                                    >
                                        Large
                                    </Radio.Button>
                                </Radio.Group>
                            </Col>

                            <Col className="mt-2">
                                <Radio.Group
                                    value={proudctSize}
                                    onChange={(e) =>
                                        setProductSize(e.target.value)
                                    }
                                >
                                    <Radio.Button
                                        value="small"
                                        style={{ width: 90 }}
                                    >
                                        $ {productSizePrice?.small}
                                    </Radio.Button>
                                    <Radio.Button
                                        value="medium"
                                        style={{ width: 90 }}
                                    >
                                        $ {productSizePrice?.medium}
                                    </Radio.Button>
                                    <Radio.Button
                                        value="large"
                                        style={{ width: 90 }}
                                    >
                                        $ {productSizePrice?.large}
                                    </Radio.Button>
                                </Radio.Group>
                            </Col>
                        </Card>

                        <div className="mt-8 flex items-center justify-between">
                            <div className="border border-gray/30 px-3 py-2 rounded-md flex items-center justify-between w-32 bg-activeLight">
                                <button
                                    className="hover:text-active transition-all text-2xl"
                                    onClick={() => handleProductQuantity(-1)}
                                >
                                    <CiCircleMinus />
                                </button>
                                <span className="text-xs">{quantity}</span>
                                <button
                                    className="hover:text-active transition-all text-2xl"
                                    onClick={() => handleProductQuantity(+1)}
                                >
                                    <CiCirclePlus />
                                </button>
                            </div>

                            <div className="font-semibold">
                                <span className="tracking-wider bg-activeLight px-4 py-2 rounded-full">
                                    ${" "}
                                    {getTotal(
                                        productSizePrice[proudctSize],
                                        quantity
                                    )}
                                </span>
                            </div>
                        </div>
                    </Badge.Ribbon>

                    {product.availability ? (
                        <Button
                            type="primary"
                            className="mt-8"
                            icon={<FiShoppingCart />}
                            onClick={addToCart}
                        >
                            Add To Cart
                        </Button>
                    ) : (
                        <Typography.Paragraph className="text-red-500 mt-4">
                            Product currently unavailable.
                        </Typography.Paragraph>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SingleProduct;
