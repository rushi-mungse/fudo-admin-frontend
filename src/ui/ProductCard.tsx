import { Button, Tag, message } from "antd";
import { ProductDataType } from "../types";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addProduct } from "../store/slices/cart";

interface PropType {
    product: ProductDataType;
}

const ProductCard = ({ product }: PropType) => {
    const dispatch = useAppDispatch();
    const [context, contextHolder] = message.useMessage();

    const addToCart = (
        e: React.MouseEvent<HTMLElement, MouseEvent>,
        product: ProductDataType
    ) => {
        e.preventDefault();
        context.open({
            type: "success",
            content: "Item added successfully.",
            duration: 3,
        });
        dispatch(addProduct({ productId: product.id, quantity: 1 }));
    };

    return (
        <Link
            to={`/product/${product.id}`}
            className="w-full flex items-center justify-center"
        >
            <div className="relative flex items-center rounded-md cursor-pointer shadow hover:bg-neutral-100 transition-all">
                {contextHolder}
                <div className="absolute bg-activeLight rounded-[50%] h-10 w-10 top-2 right-2 flex items-center justify-center flex-col">
                    <span className="text-xs text-pure">
                        {product.discount}%
                    </span>
                    <span className="text-[8px] text-pure">Off</span>
                </div>

                <div className="absolute  top-6 left-[50%] flex items-center justify-center flex-col">
                    {product.availability ? (
                        <Tag color="blue" className="px-3 rounded-full">
                            Available
                        </Tag>
                    ) : (
                        <Tag color="red" className="px-3 rounded-full">
                            Unavailable
                        </Tag>
                    )}
                </div>

                <div className="p-3 bg-activeLight rounded-md flex items-center justify-center">
                    <img
                        className="fit h-[250px] w-[350px]"
                        src={product.imageUrl ? product.imageUrl : "/food.png"}
                        alt="food"
                    />
                </div>
                <div className="w-[400px]">
                    <div className="flex items-center justify-center flex-col">
                        <span className="text-active italic text-md px-3 py-1 my-2">
                            {product.name}
                        </span>
                        <p className="text-center text-dark/80 text-sm w-[80%]">
                            {product.description}
                        </p>
                    </div>
                    <div className="flex items-center justify-between w-[80%] mx-auto mt-4">
                        <span className="text-active text-sm">
                            $ {product.prices[0].price}
                        </span>
                        <Button
                            type="primary"
                            shape="round"
                            onClick={(e) => addToCart(e, product)}
                            disabled={!product.availability}
                        >
                            Add
                        </Button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
