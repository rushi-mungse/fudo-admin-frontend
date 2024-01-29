import { useState } from "react";
import { Button, Input, Table, message } from "antd";
import { AxiosError } from "axios";
import { useQuery } from "react-query";
import { ErrorType, UserDataResponse, UserDataType } from "../../types";
import { SearchOutlined, UserAddOutlined } from "@ant-design/icons";
import { UserTableColumn } from "../../TableColumns";
import { getUsers } from "../../apis";
import { Modal } from "../../components";

const Users: React.FC = () => {
    const [userData, setUserData] = useState<UserDataType[]>([]);
    const [context, contextHolder] = message.useMessage();

    const { isLoading } = useQuery({
        queryKey: ["allUsers"],
        queryFn: async () => getUsers(),
        onSuccess: async ({ data }: UserDataResponse) =>
            setUserData(data.users),
        onError: async (err: AxiosError) => {
            const errors = err.response?.data as unknown as ErrorType;
            context.open({
                type: "error",
                content: errors.error[0].msg,
                duration: 3,
            });
        },
    });

    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const handleOnClick = () => openDrawer();

    return (
        <>
            {contextHolder}
            <div className="mb-8 flex items-center justify-between">
                <div className="flex-center">
                    <Input
                        allowClear
                        placeholder="Search user"
                        style={{ width: 250 }}
                        suffix={<SearchOutlined className="text-gray" />}
                    />
                </div>
                <Button
                    type="primary"
                    icon={<UserAddOutlined />}
                    onClick={handleOnClick}
                >
                    Create User
                </Button>
            </div>
            <Table
                bordered
                columns={UserTableColumn}
                pagination={{ position: ["bottomRight"] }}
                dataSource={userData}
                loading={isLoading}
                rowKey="id"
            />
            <Modal open={open} closeDrawer={closeDrawer} title="Create User">
                <h1>Hello</h1>
            </Modal>
        </>
    );
};

export default Users;
