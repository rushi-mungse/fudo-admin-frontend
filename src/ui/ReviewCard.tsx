import { Avatar, Rate, Tooltip } from "antd";
import { UserOutlined, AntDesignOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const Reviews = () => {
    return (
        <>
            <Avatar.Group>
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=1" />
                <Avatar style={{ backgroundColor: "#f56a00" }}>K</Avatar>
                <Tooltip title="Ant User" placement="top">
                    <Avatar
                        style={{ backgroundColor: "#87d068" }}
                        icon={<UserOutlined />}
                    />
                </Tooltip>
                <Avatar
                    style={{ backgroundColor: "#1677ff" }}
                    icon={<AntDesignOutlined />}
                />
            </Avatar.Group>

            <div className="flex flex-col ml-4 gap-1">
                <span className="text-gray font-semibold tracking-wide">
                    Our Happy Customer
                </span>
                <span>
                    <Rate
                        disabled
                        count={1}
                        defaultValue={4}
                        className="text-sm"
                    />
                    <Link
                        to={"/reviews"}
                        className="text-sm text-pure ml-2 hover:text-active"
                    >
                        (12.5k Reviews)
                    </Link>
                </span>
            </div>
        </>
    );
};

export default Reviews;
