import { Checkbox } from "antd";

interface PropType {
    name: string;
    text: string;
}

const CheckboxField = ({ text }: PropType) => {
    return (
        <Checkbox>
            <span className="text-[14px] pl-1">{text}</span>
        </Checkbox>
    );
};

export default CheckboxField;
