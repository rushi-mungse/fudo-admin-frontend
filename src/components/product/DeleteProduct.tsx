import { Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { AxiosError } from "axios";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { ErrorType } from "../../types";
import { deleteProduct } from "../../apis";

interface PropType {
    productId: number;
}

const DeleteProduct = ({ productId }: PropType) => {
    const navigate = useNavigate();
    const [messageApi, contexHolder] = message.useMessage();

    const { mutate } = useMutation({
        mutationKey: ["deleteProduct", productId],
        mutationFn: async () => deleteProduct(productId),
        onSuccess: async ({ data }) => {
            messageApi.open({
                type: "success",
                content: `Product ${data.productId} deleted successfully.`,
                duration: 3,
            });
        },
        onError: async (err: AxiosError) => {
            const error = err.response?.data as ErrorType;
            messageApi.open({
                type: "error",
                content: error?.error[0].msg,
                duration: 3,
            });
        },
    });

    return (
        <Space size="middle">
            {contexHolder}
            <button
                onClick={() => navigate(`/product/update/${productId}`)}
                className="text-green-400 rounded-md h-6 w-6 hover:text-green-600 transition-all "
            >
                <EditOutlined />
            </button>
            <button
                onClick={() => mutate()}
                className="text-red-400 rounded-md h-6 w-6 hover:text-red-600 transition-all "
            >
                <DeleteOutlined />
            </button>
        </Space>
    );
};

export default DeleteProduct;
