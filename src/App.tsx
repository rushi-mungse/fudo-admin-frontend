import { RouterProvider } from "react-router-dom";
import router from "./router";
import useRefreshHook from "./hooks/useRefresh";
import { Loader } from "./components";
import { useEffect } from "react";
import { useAppDispatch } from "./hooks/reduxHooks";
import { setCart } from "./store/slices/cart";
import { CartDataType } from "./types";

function App() {
    const { isLoading } = useRefreshHook();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const data = window.localStorage.getItem("cart");
        if (data) {
            const cart = JSON.parse(data) as CartDataType;
            dispatch(setCart(cart));
        }
    }, []);

    if (isLoading)
        return (
            <div className="h-screen w-screen bg-bgColor flex items-center justify-center">
                <Loader />
            </div>
        );
    return (
        <div className="bg-bgColor min-h-screen text-pure">
            <RouterProvider router={router} />
        </div>
    );
}

export default App;
