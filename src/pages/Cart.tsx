import { Button } from "antd";
import { CartItem, EmptyCart } from "../components";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store";
import { clearCart } from "../store/slices/cart";
import { CartColumn } from "../TableColumns";

const Cart = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state: RootState) => state.cartSlice.cart);

    if (!cart) return <EmptyCart />;

    const items = [];
    for (const key in cart?.items) {
        items.push({ productId: key, quantity: cart?.items[key] });
    }

    return (
        <div className="pt-24 container mx-auto">
            <CartColumn />
            <div>
                {items.map((item) => (
                    <CartItem
                        productId={Number(item.productId)}
                        quantity={item.quantity}
                        size="small"
                        key={item.productId}
                    />
                ))}
            </div>
            <div className="mt-8 flex items-center justify-end">
                <span className="tracking-wider">Total : &nbsp; $ {1000}</span>
            </div>
            <div className="mt-8 flex items-center justify-end">
                <Button onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </Button>
            </div>
        </div>
    );
};

export default Cart;
