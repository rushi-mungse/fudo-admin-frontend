import { Avatar, Layout } from "antd";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store";
import { CartItems } from "..";
const { Header } = Layout;

const DashBoardHeader = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    if (user?.fullName) {
        console.log(user.fullName);
    }
    return (
        <Header
            style={{
                height: 48,
                backgroundColor: import.meta.env.VITE_BG_COLOR,
                // borderBottom: "1px solid #1D1D1D",
            }}
            className="flex items-center justify-end gap-4"
        >
            <CartItems />
            <Avatar src={user?.avatar} className="border border-black">
                R
            </Avatar>
        </Header>
    );
};

export default DashBoardHeader;
