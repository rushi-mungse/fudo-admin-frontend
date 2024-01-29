import {
    Button,
    Card,
    Flex,
    Form,
    InputNumber,
    Switch,
    Typography,
    UploadFile,
    message,
} from "antd";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { AxiosError } from "axios";
import {
    InputField,
    SelectField,
    TextAreaField,
    UploadField,
} from "../../../ui";
import { getCategories } from "../../../apis";
import { createProduct } from "../../../apis/client";
import { NameIcon } from "../../../icons";
import { transformCategory } from "../../../utils";
import { CategoryDataType, CategoryResponse, ErrorType } from "../../../types";
import {
    ProductCategoryRules,
    ProductDescriptionRules,
    ProductDiscountRules,
    ProductIngredientsRules,
    ProductLargeSizePriceRules,
    ProductMediumSizePriceRules,
    ProductNameRules,
    ProductPreparationTimeRules,
    ProductPriceCurrencyRules,
    ProductSmallSizePriceRules,
} from "../../../utils/rules";

const CreateProduct = () => {
    const [form] = Form.useForm();
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

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [availability, setAvailability] = useState<boolean>(false);

    const { mutate } = useMutation({
        mutationKey: ["createProduct"],
        mutationFn: async (data: FormData) => createProduct(data),
        onSuccess: async ({ data }) => {
            console.log(data);
            context.open({
                type: "success",
                content: "Product published successfully!",
                duration: 3,
            });
            setFileList([]);
            form.resetFields();
        },
        onError: (err: AxiosError) => handleOnError(err),
    });

    const handleOnFinish = () => {
        if (!fileList) return;

        const data = { ...form.getFieldsValue() };
        const sizesAndPrices = {
            small: data.small,
            medium: data.medium,
            large: data.large,
        };

        const formData = new FormData();
        formData.append("sizeAndPrices", JSON.stringify(sizesAndPrices));
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("currency", data.currency);
        formData.append("availability", String(availability));
        formData.append("ingredients", data.ingredients);
        formData.append("category", data.category);
        formData.append("discount", data.discount);
        formData.append("preparationTime", data.preparationTime);
        formData.append("image", fileList[0].originFileObj as File);

        mutate(formData);
    };

    return (
        <div>
            {contextHolder}
            <Form form={form} onFinish={handleOnFinish}>
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <Typography.Paragraph>
                            Product info
                        </Typography.Paragraph>
                        <InputField
                            name="name"
                            placeholder="Enter product name"
                            fieldRules={ProductNameRules}
                            icon={<NameIcon />}
                        />

                        <TextAreaField
                            name="description"
                            placeholder="Enter Product description"
                            fieldRules={ProductDescriptionRules}
                        />

                        <SelectField
                            name="category"
                            fieldRules={ProductCategoryRules}
                            options={transformCategory(categories)}
                            placeholder="Product category"
                            isLoading={isLoading}
                        />
                    </Card>

                    <Card>
                        <Typography.Paragraph>
                            Upload Product Image
                        </Typography.Paragraph>

                        <div className="h-[70px]">
                            <UploadField
                                fileSize={1}
                                fileList={fileList}
                                setFileList={setFileList}
                                listType="picture"
                            />
                        </div>

                        <Typography.Paragraph />

                        <SelectField
                            name="currency"
                            placeholder="Product price currency"
                            fieldRules={ProductPriceCurrencyRules}
                            options={[{ key: "ind", value: "IND" }]}
                            isLoading={false}
                        />

                        <InputField
                            placeholder="Enter ingredients"
                            name="ingredients"
                            fieldRules={ProductIngredientsRules}
                            icon={<NameIcon />}
                        />
                    </Card>
                </div>

                <Card className="mt-8">
                    <Typography.Paragraph>
                        Product Metadata
                    </Typography.Paragraph>

                    <div className="grid grid-cols-2 gap-4">
                        <Form.Item name="discount" rules={ProductDiscountRules}>
                            <InputNumber
                                placeholder="Product discount"
                                style={{ width: "100%" }}
                                min={0}
                                max={99}
                            />
                        </Form.Item>

                        <Form.Item
                            name="small"
                            rules={ProductSmallSizePriceRules}
                        >
                            <InputNumber
                                placeholder="Small size price"
                                style={{ width: "100%" }}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="medium"
                            rules={ProductMediumSizePriceRules}
                        >
                            <InputNumber
                                placeholder="Medium size price"
                                style={{ width: "100%" }}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="large"
                            rules={ProductLargeSizePriceRules}
                        >
                            <InputNumber
                                placeholder="Large size price"
                                style={{ width: "100%" }}
                                min={0}
                            />
                        </Form.Item>

                        <Form.Item
                            name="preparationTime"
                            rules={ProductPreparationTimeRules}
                        >
                            <InputNumber
                                placeholder="Product preparation time"
                                style={{ width: "100%" }}
                                min={0}
                            />
                        </Form.Item>
                    </div>

                    <Typography.Paragraph>
                        Product availability
                        <Switch
                            size="small"
                            defaultChecked={availability}
                            onChange={(value) => setAvailability(value)}
                            className="ml-4"
                        />
                    </Typography.Paragraph>
                </Card>

                <Flex justify="end" style={{ marginTop: 20 }}>
                    <Button htmlType="submit" type="primary">
                        Create Product
                    </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default CreateProduct;
