import { Button, Form, message } from "antd";
import { LockOutlined, MailOutlined, GoogleOutlined } from "@ant-design/icons";
import { EmailRules, PasswordRules } from "../utils/rules";
import { LOGIN_DESCRIPTION, LOGIN_TITLE } from "../constants";
import {
    CheckboxField,
    PasswordInputField,
    InputField,
    Content,
    TextBorder,
    LinkText,
} from "../ui";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import {
    ErrorType,
    LoginData,
    VerifyOtpForRegisterResponseData,
} from "../types";
import { setAuth } from "../store/slices/auth";
import { AxiosError } from "axios";
import { useMutation } from "react-query";
import { login } from "../apis";

const Login = () => {
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [context, contextHolder] = message.useMessage();

    const handleOnSuccess = (data: VerifyOtpForRegisterResponseData) => {
        form.resetFields();
        context.open({
            type: "success",
            content: data.message,
            duration: 3,
        });
        dispatch(setAuth(data.user));
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
        mutationFn: async (data: LoginData) => login(data),
        onSuccess: async ({ data }) => handleOnSuccess(data),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    return (
        <div className="container mx-auto">
            {contextHolder}
            <div className="flex items-center justify-center w-full h-screen">
                <div className="grid grid-cols-2 gap-12">
                    <div className="flex items-center justify-center">
                        <img src="/login.svg" alt="login" height="500" />
                    </div>

                    <div className="flex items-center justify-center flex-col ring-1 ring-neutral-600 py-10 rounded-md">
                        <div className="w-[350px]">
                            <Content
                                title={LOGIN_TITLE}
                                description={LOGIN_DESCRIPTION}
                                className="mb-4"
                            />

                            <Form
                                form={form}
                                className="flex items-center flex-col"
                                onFinish={() => {
                                    const data =
                                        form.getFieldsValue() as LoginData;
                                    console.log(data);
                                    mutate(data);
                                }}
                            >
                                <InputField
                                    name="email"
                                    placeholder="Enter register email address"
                                    icon={<MailOutlined className="pr-2" />}
                                    fieldRules={EmailRules}
                                />

                                <PasswordInputField
                                    name="password"
                                    placeholder="Enter login password"
                                    icon={<LockOutlined className="pr-2" />}
                                    fieldRules={PasswordRules}
                                />

                                <div className="flex items-center justify-between w-full mb-4">
                                    <CheckboxField
                                        text="Remember me"
                                        name="remember"
                                    />

                                    <LinkText
                                        to="/auth/forget-password/send-otp"
                                        text="Forgot password?"
                                    />
                                </div>

                                <Button
                                    type="primary"
                                    shape="round"
                                    htmlType="submit"
                                >
                                    Login An Account
                                </Button>
                            </Form>

                            <div className="w-full text-center my-4">
                                <LinkText
                                    to="/auth/register/send-otp"
                                    text="Don't have an account?"
                                />
                            </div>

                            <TextBorder text="OR" />

                            <div className="w-full flex items-center justify-center">
                                <Button icon={<GoogleOutlined />}>
                                    Login with Google
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
