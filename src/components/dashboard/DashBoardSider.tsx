import { Layout, Menu } from "antd";
import { NavLink, useLocation } from "react-router-dom";
import { useQuery } from "react-query";
import { Logo } from "../../ui";
import { GoHome } from "react-icons/go";
import { BiLogoProductHunt, BiUser } from "react-icons/bi";
import { GrOrderedList } from "react-icons/gr";
import { CgSize } from "react-icons/cg";
import { TbCategoryFilled } from "react-icons/tb";
import { LuLogOut } from "react-icons/lu";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { clearAuth } from "../../store/slices/auth";
import { logout } from "../../apis";
const { Sider } = Layout;

const baseItems = [
    {
        key: "/dashboard",
        icon: <GoHome />,
        label: <NavLink to="/dashboard">Home</NavLink>,
    },
    {
        key: "/dashboard/users",
        icon: <BiUser />,
        label: <NavLink to="/dashboard/users">Users</NavLink>,
    },
    {
        key: "/dashboard/products",
        icon: <BiLogoProductHunt />,
        label: <NavLink to="/dashboard/products">Products</NavLink>,
    },
    {
        key: "/dashboard/orders",
        icon: <GrOrderedList />,
        label: <NavLink to="/dashboard/orders">Orders</NavLink>,
    },
    {
        key: "/dashboard/product-sizes",
        icon: <CgSize />,
        label: <NavLink to="/dashboard/product-sizes">Sizes</NavLink>,
    },
    {
        key: "/dashboard/product-categories",
        icon: <TbCategoryFilled />,
        label: <NavLink to="/dashboard/product-categories">Categories</NavLink>,
    },
];

const DashBoardSider = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();

    const { refetch } = useQuery({
        queryFn: async () => await logout(),
        onSuccess: async () => dispatch(clearAuth()),
        enabled: false,
    });

    const logoutItem = [
        {
            key: "/logout",
            icon: <LuLogOut />,
            label: <div onClick={() => refetch()}>Logout</div>,
        },
    ];

    return (
        <Sider
            style={{
                backgroundColor: import.meta.env.VITE_BG_COLOR,
                // borderRight: "1px solid #1D1D1D",
            }}
        >
            <div className="flex items-center justify-between flex-col h-full">
                <div className="w-full">
                    <div className="pt-4 pb-6">
                        <Logo />
                    </div>
                    <Menu
                        style={{
                            backgroundColor: import.meta.env.VITE_BG_COLOR,
                            border: "none",
                            fontSize: 14,
                        }}
                        defaultSelectedKeys={[location.pathname]}
                        mode="inline"
                        items={baseItems}
                    />
                </div>

                <Menu
                    style={{
                        backgroundColor: import.meta.env.VITE_BG_COLOR,
                        border: "none",
                        fontSize: 14,
                        marginBottom: 3,
                    }}
                    defaultSelectedKeys={["/"]}
                    mode="inline"
                    items={logoutItem}
                />
            </div>
        </Sider>
    );
};

export default DashBoardSider;
