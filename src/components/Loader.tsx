import { Spin } from "antd";

const Loader = () => {
    return (
        <Spin size="large">
            <div className="content" />
        </Spin>
    );
};

export default Loader;
