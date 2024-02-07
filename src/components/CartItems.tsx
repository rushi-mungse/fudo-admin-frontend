import { Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store";
import { roundCartItems } from "../utils";

const CartItems = () => {
    const cart = useAppSelector((state: RootState) => state.cartSlice.cart);
    return (
        <Link to="/cart">
            <Badge className="group text-gray transition-all hover:text-active hover:ring-active ring-1 ring-gray rounded-full h-6 w-14 flex items-center justify-center gap-1">
                <ShoppingCartOutlined
                    style={{ fontSize: 16, paddingLeft: 4 }}
                />
                <p className="mb-0 mr-1">
                    {cart ? roundCartItems(cart.totalItems) : 0}{" "}
                </p>
            </Badge>
        </Link>
    );
};

export default CartItems;
