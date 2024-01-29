import { useState } from "react";
import { Button, Form } from "antd";
import { GrAddCircle } from "react-icons/gr";
import { Modal, ProductList, CreateProduct } from "../../components";
import { SearchInput } from "../../ui";

const Products: React.FC = () => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const handleOnClick = () => openDrawer();

    const [form] = Form.useForm();

    return (
        <>
            <div className="mb-8 flex items-center justify-between">
                <div className="flex-center">
                    <Form form={form}>
                        <SearchInput
                            placeholder="Search Product"
                            name="productName"
                        />
                    </Form>
                </div>
                <Button
                    type="primary"
                    icon={<GrAddCircle />}
                    className="flex items-center justify-center"
                    onClick={handleOnClick}
                >
                    Create Product
                </Button>
            </div>

            <ProductList />

            <Modal
                open={open}
                closeDrawer={closeDrawer}
                title={"Create Product"}
            >
                {/* <UpdateProduct productId={29} /> */}
                <CreateProduct />
            </Modal>
        </>
    );
};

export default Products;
