import { useState } from "react";
import { Button, Card } from "antd";
import debounce from "debounce";
import { GrAddCircle } from "react-icons/gr";
import {
    Modal,
    ProductList,
    CreateProduct,
    ProductFilterForm,
} from "../../components";
import { ProductQuery } from "../../types";

const Products: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState<ProductQuery>({
        q: "",
        available: "",
        category: "",
    });
    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    const handleOnClick = () => openDrawer();

    return (
        <>
            <Card className="mb-8 w-full">
                <div className="w-full flex items-center justify-between">
                    <ProductFilterForm
                        onFilterChange={debounce((filterName, filterValue) => {
                            setQuery((prev) => {
                                return { ...prev, [filterName]: filterValue };
                            });
                        }, 500)}
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

            <ProductList query={query} />

            <Modal
                open={open}
                closeDrawer={closeDrawer}
                title={"Create Product"}
            >
                <CreateProduct />
            </Modal>
        </>
    );
};

export default Products;
