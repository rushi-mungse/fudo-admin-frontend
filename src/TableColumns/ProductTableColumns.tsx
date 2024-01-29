import { Avatar, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Link } from "react-router-dom";
import { ProductDataType } from "../types";
import { UserOutlined } from "@ant-design/icons";
import { TableTitle } from "../ui";

const ProductTableColumn: ColumnsType<ProductDataType> = [
    {
        title: <TableTitle title="Product Id" />,
        dataIndex: "id",
        key: "id",
    },
    {
        title: <TableTitle title="Image" />,
        dataIndex: "imageUrl",
        key: "imageUrl",
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
        title: <TableTitle title="Product Name" />,
        dataIndex: "name",
        key: "name",
        render: (text, recorer) => (
            <Link
                to={`/product/update/${recorer.id}`}
                className="hover:text-active"
            >
                {text}
            </Link>
        ),
    },
    {
        title: <TableTitle title="Description" />,
        dataIndex: "description",
        key: "description",
    },
    {
        title: <TableTitle title="Product Status" />,
        dataIndex: "availability",
        key: "availability",
        render: (avail) => {
            const color = avail === true ? "blue" : "red";
            return (
                <Tag color={color} key="avail" className="rounded-full px-2">
                    {avail ? "Available" : "Unavailable"}
                </Tag>
            );
        },
    },

    {
        title: <TableTitle title="Product Size | Price" />,
        dataIndex: "prices",
        key: "prices",
        render: (_, record) => {
            return record.prices.map((price) => {
                const size = price.size?.size;
                const color =
                    size === "small"
                        ? "gold"
                        : size === "medium"
                        ? "blue"
                        : "purple";
                return (
                    <Tag
                        color={color}
                        key={price.id}
                        className="rounded-full px-2 my-1"
                    >
                        {size} | {price.price}
                    </Tag>
                );
            });
        },
    },
    {
        title: <TableTitle title="Discount" />,
        dataIndex: "discount",
        key: "discount",
    },
    {
        title: <TableTitle title="Product Categories" />,
        dataIndex: "prices",
        key: "prices",
        render: (_, record) => {
            return record.categories.map((category) => {
                return (
                    <Tag
                        color="purple"
                        key={category.id}
                        className="rounded-full px-2 my-1"
                    >
                        {category.name}
                    </Tag>
                );
            });
        },
    },
];

export default ProductTableColumn;
