import { useState } from "react";
import { useQuery } from "react-query";
import { AxiosError } from "axios";
import { Input, Select, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { CategoryDataType, CategoryResponse, ErrorType } from "../../../types";
import { getCategories } from "../../../apis";
import { transformCategory } from "../../../utils";

type PropType = {
    onFilterChange: (filterName: string, filterValue: string) => void;
};

const ProductFilterForm = ({ onFilterChange }: PropType) => {
    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [context, contextHolder] = message.useMessage();

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const { isLoading } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => getCategories(),
        onSuccess: async ({ data }: CategoryResponse) =>
            setCategories(data.categories),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    return (
        <>
            {contextHolder}
            <Input
                allowClear
                placeholder="Search product"
                style={{ width: 250 }}
                onChange={(e) => onFilterChange("product", e.target.value)}
                suffix={<SearchOutlined className="text-gray" />}
            />

            <Select
                allowClear
                placeholder="Select status"
                style={{ width: 200 }}
                onChange={(value) => onFilterChange("Status", value)}
                options={[
                    { value: "jack", label: "Jack" },
                    { value: "lucy", label: "Lucy" },
                    { value: "Yiminghe", label: "yiminghe" },
                    { value: "disabled", label: "Disabled", disabled: true },
                ]}
            />

            <Select
                allowClear
                placeholder="Select category"
                style={{ width: 200 }}
                onChange={(value) => onFilterChange("category", value)}
                options={transformCategory(categories)}
                loading={isLoading}
            />
        </>
    );
};

export default ProductFilterForm;
