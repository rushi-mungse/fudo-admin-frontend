import { useParams } from "react-router-dom";
import { UpdateProduct } from "../../components";

const UpdateProductPage = () => {
    const { productId } = useParams();
    return (
        <div className="container mx-auto pt-24">
            <UpdateProduct productId={Number(productId)} />
        </div>
    );
};

export default UpdateProductPage;
