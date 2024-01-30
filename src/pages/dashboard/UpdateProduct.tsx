import { useParams } from "react-router-dom";
import { GoBack, UpdateProduct } from "../../components";

const UpdateProductPage = () => {
    const { productId } = useParams();

    return (
        <div className="container mx-auto pt-20">
            <GoBack />
            <UpdateProduct productId={Number(productId)} />
        </div>
    );
};

export default UpdateProductPage;
