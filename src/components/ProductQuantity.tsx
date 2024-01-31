import { useState } from "react";
import { message } from "antd";
import { CiCircleMinus, CiCirclePlus } from "react-icons/ci";
import { useAppDispatch } from "../hooks/reduxHooks";
import { addProduct } from "../store/slices/cart";

interface PropType {
    productId: number;
    quantity: number;
}

const ProductQuantity = ({ productId, quantity: qnt }: PropType) => {
    const [quantity, setQuantity] = useState<number>(qnt);
    const [context, contextHolder] = message.useMessage();

    const dispatch = useAppDispatch();

    const handleProductQuantity = (add: number) => {
        if (quantity == 1 && add == -1) return;
        dispatch(addProduct({ productId, quantity: add }));
        setQuantity((prev) => prev + add);

        if (add === 1)
            context.open({
                type: "success",
                content: `Item added successfully.`,
                duration: 3,
            });
        else
            context.open({
                type: "error",
                content: `Item remove successfully.`,
                duration: 3,
            });
    };

    return (
        <div className="border border-gray/30 px-3 py-1 rounded-full flex items-center justify-between w-24 bg-activeLight">
            {contextHolder}

            <button
                className="hover:text-active transition-all text-sm"
                onClick={() => handleProductQuantity(-1)}
            >
                <CiCircleMinus />
            </button>

            <span className="text-xs">{quantity}</span>

            <button
                className="hover:text-active transition-all text-sm"
                onClick={() => handleProductQuantity(+1)}
            >
                <CiCirclePlus />
            </button>
        </div>
    );
};

export default ProductQuantity;
