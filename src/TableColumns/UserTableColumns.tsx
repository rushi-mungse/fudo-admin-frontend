import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { UserDataType } from "../types";
import { UserOutlined } from "@ant-design/icons";
import { TableTitle } from "../ui";

const UserTableColumn: ColumnsType<UserDataType> = [
    {
        title: <TableTitle title="User Id" />,
        dataIndex: "id",
        key: "id",
    },
    {
        title: <TableTitle title="Profile Picture" />,
        dataIndex: "avatar",
        key: "avatar",
        render: (text) => (
            <Avatar
                src={text}
                alt="food-image"
                size={"large"}
                icon={<UserOutlined />}
            />
        ),
    },
    {
        title: <TableTitle title="Full Name" />,
        dataIndex: "fullName",
        key: "fullName",
        render: (text, recorer) => (
            <Link to={`/user/show/${recorer.id}`} className="hover:text-active">
                {text}
            </Link>
        ),
    },
    {
        title: <TableTitle title="Email" />,
        dataIndex: "email",
        key: "email",
    },
    {
        title: <TableTitle title="Phone Number" />,
        dataIndex: "phoneNumber",
        key: "phoneNumber",
    },
    {
        title: <TableTitle title="Status" />,
        dataIndex: "status",
        render: (status) => (
            <Tag color={"blue"} key="avail" className="rounded-full px-2">
                {status}
            </Tag>
        ),
    },
    {
        title: <TableTitle title="User Role" />,
        dataIndex: "role",
        key: "role",
        render: (role) => {
            const color = role === "admin" ? "orange" : "green";
            return (
                <Tag color={color} key="avail" className="rounded-full px-2">
                    {role}
                </Tag>
            );
        },
    },
];

export default UserTableColumn;
