import { Button } from "antd";
import { Link, NavLink } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { Logo, PageLinks } from "../ui";
import pageLinks from "../utils/pageLinks";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store";
import { CartItems } from "../components";

const Header = () => {
    const isAuth = useAppSelector(
        (state: RootState) => state.authReducer.isAuth
    );

    return (
        <div className="border-b border-neutral-300/50 fixed top-0 w-screen z-10 bg-bgColor">
            <div className="w-full mx-auto container flex items-center justify-between h-12">
                <div className="flex items-center justify-center">
                    <Logo />
                    <div className="ml-8">
                        <PageLinks links={pageLinks} />
                    </div>
                </div>
                <div className="flex items-center justify-center gap-4">
                    {/* <ConfigProvider
                        theme={{
                            token: { colorPrimary: "transparent" },
                            algorithm: [
                                theme.darkAlgorithm,
                                theme.compactAlgorithm,
                            ],
                        }}
                    > */}
                    {/* <Input
                        allowClear
                        variant="filled"
                        placeholder="Search menu"
                        suffix={<SearchOutlined className="text-gray" />}
                    /> */}
                    {/* </ConfigProvider> */}

                    <CartItems />

                    {!isAuth ? (
                        <>
                            <Link to="/auth/login">
                                <Button className="text-gray">Log In</Button>
                            </Link>

                            <Link to="/auth/register/send-otp">
                                <Button className="text-gray">Sign Up</Button>
                            </Link>
                        </>
                    ) : (
                        <NavLink
                            to="/dashboard"
                            className="text-gray w-8 transition-all hover:text-active hover:ring-active flex items-center justify-center"
                        >
                            <LuLayoutDashboard size={18} />
                        </NavLink>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
