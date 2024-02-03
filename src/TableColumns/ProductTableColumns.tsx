import moment from "moment";
import { Avatar, Tag } from "antd";
import { Link } from "react-router-dom";
import { ProductDataType } from "../types";
import type { ColumnsType } from "antd/es/table";
import { UserOutlined } from "@ant-design/icons";
import { TableTitle } from "../ui";
import { DeleteProduct } from "../components";

const ProductTableColumn: ColumnsType<ProductDataType> = [
    {
        title: <TableTitle title="Id" />,
        dataIndex: "id",
        key: "id",
        render: (id) => (
            <Link
                to={`/product/${id}`}
                className="hover:text-active text-active/90"
            >
                #{id}
            </Link>
        ),
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
        title: <TableTitle title="Name" />,
        dataIndex: "name",
        key: "name",
        render: (text, recorer) => (
            <Link to={`/product/${recorer.id}`} className="hover:text-active">
                {text}
            </Link>
        ),
    },
    // {
    //     title: <TableTitle title="Description" />,
    //     dataIndex: "description",
    //     key: "description",
    //     render: (text) => <p className="flex items-center">{text}</p>,
    // },
    {
        title: <TableTitle title="Status" />,
        dataIndex: "availability",
        key: "availability",
        render: (avail) => {
            const color = avail === true ? "blue" : "red";
            return (
                <Tag
                    color={color}
                    key="avail"
                    className="rounded-full px-2 text-xs"
                >
                    {avail ? "Available" : "Unavailable"}
                </Tag>
            );
        },
    },

    {
        title: <TableTitle title="Size & Price" />,
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
                        className="text-xs rounded-full px-2 my-1"
                    >
                        {size} | ₹{price.price}
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
        title: <TableTitle title="Categories" />,
        dataIndex: "prices",
        key: "prices",
        render: (_, record) => {
            return record.categories.map((category) => {
                return (
                    <Tag
                        color="purple"
                        key={category.id}
                        className="rounded-full px-2 my-1 text-xs"
                    >
                        {category.name}
                    </Tag>
                );
            });
        },
    },
    {
        title: <TableTitle title="Created" />,
        dataIndex: "createdAt",
        key: "createdAt",
        render: (text) => (
            <p className="text-xs">{moment(text).format("DD/MM/YYYY")}</p>
        ),
    },
    {
        title: <TableTitle title="Action" />,
        key: "action",
        render: (_, recoder) => {
            return <DeleteProduct productId={recoder.id} />;
        },
    },
];

export default ProductTableColumn;
