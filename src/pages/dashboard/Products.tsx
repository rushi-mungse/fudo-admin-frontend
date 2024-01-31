import { useState } from "react";
import { Button, Card } from "antd";
import { GrAddCircle } from "react-icons/gr";
import {
    Modal,
    ProductList,
    CreateProduct,
    ProductFilterForm,
} from "../../components";

const Products: React.FC = () => {
    const [open, setOpen] = useState(false);
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const handleOnClick = () => openDrawer();

    return (
        <>
            <Card className="mb-8 w-full">
                <div className="w-full flex items-center justify-between">
                    <ProductFilterForm
                        onFilterChange={(filterName, filterValue) => {
                            console.log(filterName, filterValue);
                        }}
                    />
                    <Button
                        type="primary"
                        icon={<GrAddCircle />}
                        className="flex items-center justify-center"
                        onClick={handleOnClick}
                    >
                        Create Product
                    </Button>
                </div>
            </Card>

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
