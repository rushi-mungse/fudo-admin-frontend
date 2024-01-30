import { Button, ConfigProvider } from "antd";
import { useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

const GoBack = () => {
    const nevigate = useNavigate();
    const goBack = () => nevigate(-1);

    return (
        <ConfigProvider
            theme={{
                token: {
                    colorLink: import.meta.env.VITE_PRIMARY_COLOR,
                },
            }}
        >
            <Button
                type="link"
                className="mb-4 flex items-center justify-center"
                icon={<IoMdArrowBack />}
                onClick={goBack}
            >
                Back
            </Button>
        </ConfigProvider>
    );
};

export default GoBack;
