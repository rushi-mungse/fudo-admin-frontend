import { Button, Form, message } from "antd";
import { CheckCircleOutlined } from "@ant-design/icons";
import { Content, OtpField } from "../../ui";
import { OTP_VERIFY_TITLE, getOtpDescription } from "../../constants";
import { OtpRules } from "../../utils/rules";
import { useAppSelector } from "../../hooks/reduxHooks";
import { RootState } from "../../store";
import { useDispatch } from "react-redux";
import { setAuth } from "../../store/slices/auth";
import { AxiosError } from "axios";
import {
    ErrorType,
    OtpDataType,
    VerifyOtpForRegisterResponseData,
} from "../../types";
import { useMutation } from "react-query";
import { verifyOtpForRegisterUser } from "../../apis";

const VerifyOtpPage = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();
    const [context, contextHolder] = message.useMessage();
    const otpInfo = useAppSelector((state: RootState) => state.otpReducer.otp);

    const handleOnSuccess = (data: VerifyOtpForRegisterResponseData) => {
        form.resetFields();
        context.open({
            type: "success",
            content: data.message,
            duration: 3,
        });
        dispatch(setAuth(data.user));
    };

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const { mutate } = useMutation({
        mutationKey: ["sendOtp"],
        mutationFn: async (data: OtpDataType) => verifyOtpForRegisterUser(data),
        onSuccess: async ({ data }) => handleOnSuccess(data),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    const handleOnFinish = () => {
        if (!otpInfo) {
            return context.open({
                type: "error",
                content: "Otp info not found!",
                duration: 3,
            });
        }
        const otp = form.getFieldsValue().otp.join("");
        mutate({
            otp,
            email: otpInfo.email,
            fullName: otpInfo.fullName,
            hashOtp: otpInfo.hashOtp,
        });
    };

    return (
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-center w-full h-screen">
                <div className="grid grid-cols-2 gap-12">
                    <div className="flex items-center justify-center">
                        <img src="/verify.svg" alt="verify" height="500" />
                    </div>

                    <div className="flex items-center justify-center flex-col ring-1 ring-neutral-600 py-10 rounded-md">
                        <div className="w-[350px]">
                            <Content
                                title={OTP_VERIFY_TITLE}
                                description={getOtpDescription("foo@gmail.com")}
                                className="mb-4"
                            />

                            <div className="text-6xl text-gray text-center py-6">
                                <CheckCircleOutlined />
                            </div>

                            <Form
                                form={form}
                                className="flex items-center flex-col"
                                onFinish={() => handleOnFinish()}
                            >
                                <OtpField name="otp" fieldRules={OtpRules} />
                                <Button
                                    type="primary"
                                    shape="round"
                                    className="mt-6"
                                    htmlType="submit"
                                >
                                    Verify Otp
                                </Button>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOtpPage;
