import { Form } from "antd";
import { InputOTP } from "antd-input-otp";
import { Rule } from "antd/es/form";

interface PropType {
    name: string;
    fieldRules: Rule[];
}

const OtpField = ({ name, fieldRules }: PropType) => {
    return (
        <Form.Item name={name} rules={fieldRules}>
            <InputOTP autoFocus inputType="numeric" length={4} />
        </Form.Item>
    );
};

export default OtpField;
