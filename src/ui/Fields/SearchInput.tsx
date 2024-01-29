import { Form, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

interface PropType {
    placeholder: string;
    name: string;
}

const SearchInput = ({ placeholder, name }: PropType) => {
    return (
        <Form.Item>
            <Input
                allowClear
                name={name}
                placeholder={placeholder}
                style={{ width: 250 }}
                suffix={<SearchOutlined className="text-gray" />}
            />
        </Form.Item>
    );
};

export default SearchInput;
