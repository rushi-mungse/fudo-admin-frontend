import { Link } from "react-router-dom";

const EmptyCart = () => {
    return (
        <div className="flex items-center justify-center">
            <div className="pt-24 flex items-center justify-center flex-col gap-4">
                <div className="text-active text-4xl">Your cart is empty</div>
                <p>
                    Look like you have not added anything to cart.
                    <Link
                        to="/menu"
                        className="text-active/80 hover:text-active"
                    >
                        &nbsp; Go ahead &nbsp;
                    </Link>
                    & explore top products.
                </p>
                <img src="/empty_cart.svg" alt="empty_cart" height={500} />
            </div>
        </div>
    );
};

export default EmptyCart;
