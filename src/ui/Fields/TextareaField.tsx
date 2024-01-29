import { Form, Input } from "antd";
import { Rule } from "antd/es/form";

interface PropType {
    name: string;
    fieldRules: Rule[];
    placeholder: string;
}

const TextareaField = ({ name, fieldRules, placeholder }: PropType) => {
    return (
        <Form.Item rules={fieldRules} className="w-full" name={name}>
            <Input.TextArea
                placeholder={placeholder}
                className="font-light px-4 py-1 text-[14px]"
            />
        </Form.Item>
    );
};

export default TextareaField;
