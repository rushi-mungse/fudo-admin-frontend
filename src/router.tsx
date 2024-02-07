import { Layout } from "antd";
import { useAppSelector } from "./hooks/reduxHooks";
import { RootState } from "./store";
import {
    DashBoardHeader,
    DashBoardSider,
    Header,
    SingleProduct,
} from "./components";
import {
    Navigate,
    Outlet,
    Route,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import {
    SendOtpPage,
    LoginPage,
    HomePage,
    VerifyOtpPage,
    CartPage,
    Users,
    DashBoardHomePage,
    Orders,
    ProductCategories,
    ProductSizes,
    Products,
} from "./pages";
import UpdateProductPage from "./pages/dashboard/UpdateProduct";
import Menu from "./pages/Menu";

const GuestRoute = () => {
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
        </main>
    );
};

const NonAuthRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );

    if (isAuth) return <Navigate to="/" />;
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
        </main>
    );
};

const AuthRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );

    if (!isAuth) return <Navigate to="/" />;
    return (
        <main className="bg-bgColor">
            <Header />
            <Outlet />
        </main>
    );
};

const DashBoardRoute = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );
    if (!isAuth) return <Navigate to="/" />;
    return (
        <main className="bg-bgColor">
            <Layout style={{ minHeight: "100vh" }}>
                <DashBoardSider />
                <Layout>
                    <DashBoardHeader />
                    <div className="h-full rounded-md p-8 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                        <Outlet />
                    </div>
                </Layout>
            </Layout>
        </main>
    );
};

const Router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route path="" element={<GuestRoute />}>
                <Route index element={<HomePage />} />
                <Route path="cart" element={<CartPage />} />
                <Route path="menu" element={<Menu />} />
            </Route>

            <Route path="auth" element={<NonAuthRoute />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register">
                    <Route path="send-otp" element={<SendOtpPage />} />
                    <Route path="verify-otp" element={<VerifyOtpPage />} />
                </Route>
            </Route>
            <Route path="product" element={<AuthRoute />}>
                <Route path=":productId" element={<SingleProduct />} />
                <Route
                    path="update/:productId"
                    element={<UpdateProductPage />}
                />
            </Route>
            <Route path="dashboard" element={<DashBoardRoute />}>
                <Route path="" element={<DashBoardHomePage />} />
                <Route path="users" element={<Users />} />
                <Route path="orders" element={<Orders />} />
                <Route
                    path="product-categories"
                    element={<ProductCategories />}
                />
                <Route path="product-sizes" element={<ProductSizes />} />
                <Route path="products" element={<Products />} />
            </Route>
        </Route>
    )
);

export default Router;
