import { Col, Row } from "antd";

const CartColumns = () => {
    return (
        <Row className="border-b border-gray/20 py-8 flex items-center justify-center text-active">
            <Col span={2} className="flex items-center justify-center">
                Image
            </Col>

            <Col span={4} className="flex items-center justify-center">
                Product Name
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Proudct Size
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Proudct Price / Item
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Quantity
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Add & Remove Items
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Total Amount
            </Col>

            <Col span={3} className="flex items-center justify-center">
                Delete Product
            </Col>
        </Row>
    );
};

export default CartColumns;
