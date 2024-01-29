import { Avatar, Layout } from "antd";
const { Header } = Layout;

const DashBoardHeader = () => {
    return (
        <Header
            style={{
                height: 48,
                backgroundColor: import.meta.env.VITE_BG_COLOR,
                // borderBottom: "1px solid #1D1D1D",
            }}
            className="flex items-center justify-end"
        >
            <Avatar>R</Avatar>
        </Header>
    );
};

export default DashBoardHeader;
