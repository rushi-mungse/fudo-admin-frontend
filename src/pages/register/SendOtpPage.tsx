import { Button, Form, message } from "antd";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { SIGN_UP_DESCRIPTION, SIGN_UP_TITLE } from "../../constants";
import { sendOtpForRegisterUser } from "../../apis";
import {
    LockOutlined,
    MailOutlined,
    GoogleOutlined,
    UserOutlined,
} from "@ant-design/icons";
import {
    FullNameRules,
    EmailRules,
    PasswordRules,
    ConfirmPasswordRules,
} from "../../utils/rules";
import {
    PasswordInputField,
    InputField,
    Content,
    TextBorder,
    LinkText,
} from "../../ui";
import {
    ErrorType,
    SendOtpForRegisterUserData,
    SendOtpForRegisterUserResponseData,
} from "../../types";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { setOtp } from "../../store/slices/otp";

const SendOtpPage = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [context, contextHolder] = message.useMessage();

    const handleOnSuccess = (data: SendOtpForRegisterUserResponseData) => {
        form.resetFields();
        context.open({
            type: "success",
            content: data.message,
            duration: 3,
        });
        dispatch(setOtp({ ...data.otpInfo, otp: data.otp }));
        navigate("/auth/register/verify-otp");
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
        mutationFn: async (data: SendOtpForRegisterUserData) =>
            sendOtpForRegisterUser(data),
        onSuccess: async ({ data }) => handleOnSuccess(data),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    return (
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-center w-full h-screen">
                <div className="grid grid-cols-2 gap-12">
                    <div className="flex items-center justify-center">
                        <img src="/login.svg" alt="sign_up" height="500" />
                    </div>

                    <div className="flex items-center justify-center flex-col ring-1 ring-neutral-600 py-10 rounded-md">
                        <div className="w-[350px]">
                            <Content
                                title={SIGN_UP_TITLE}
                                description={SIGN_UP_DESCRIPTION}
                                className="mb-4"
                            />

                            <Form
                                form={form}
                                className="flex items-center flex-col"
                                onFinish={() =>
                                    mutate(
                                        form.getFieldsValue() as SendOtpForRegisterUserData
                                    )
                                }
                            >
                                <InputField
                                    name="fullName"
                                    placeholder="Enter your full name"
                                    icon={<UserOutlined className="pr-2" />}
                                    fieldRules={FullNameRules}
                                />

                                <InputField
                                    name="email"
                                    placeholder="Enter your email address"
                                    icon={<MailOutlined className="pr-2" />}
                                    fieldRules={EmailRules}
                                />

                                <PasswordInputField
                                    name="password"
                                    placeholder="Enter strong password"
                                    icon={<LockOutlined className="pr-2" />}
                                    fieldRules={PasswordRules}
                                />

                                <PasswordInputField
                                    name="confirmPassword"
                                    placeholder="Confirm entered password"
                                    icon={<LockOutlined className="pr-2" />}
                                    fieldRules={ConfirmPasswordRules}
                                />

                                <Button
                                    type="primary"
                                    shape="round"
                                    htmlType="submit"
                                >
                                    Sign Up An Account
                                </Button>
                            </Form>

                            <div className="w-full text-center my-4">
                                <LinkText
                                    to="/auth/login"
                                    text="Do have an account?"
                                />
                            </div>

                            <TextBorder text="OR" />

                            <div className="w-full flex items-center justify-center">
                                <Button icon={<GoogleOutlined />}>
                                    Sign up with Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendOtpPage;
