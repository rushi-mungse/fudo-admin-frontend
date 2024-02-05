import { Avatar, Layout, Typography } from "antd";
import { useAppSelector } from "../hooks/reduxHooks";
import { RootState } from "../store";
import { CartItems } from ".";
const { Header } = Layout;

const DashBoardHeader = () => {
    const { user } = useAppSelector((state: RootState) => state.authReducer);
    return (
        <Header
            style={{
                height: 48,
                backgroundColor: import.meta.env.VITE_BG_COLOR,
            }}
            className="flex items-center justify-end gap-4"
        >
            <CartItems />
            <div className="border-l border-gray/50 w-[1px] h-[70%]"></div>
            <div className="flex items-center justify-center gap-1">
                <span className="font-light">Hello,</span>
                <Typography.Text>{user?.fullName}</Typography.Text>
                <Avatar
                    src={user?.avatar}
                    className="border border-gray/50 ml-1"
                >
                    R
                </Avatar>
            </div>
        </Header>
    );
};

export default DashBoardHeader;
