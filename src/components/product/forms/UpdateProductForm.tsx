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
import { getCategories, getProduct } from "../../../apis";
import { updateProduct } from "../../../apis/client";
import { NameIcon } from "../../../icons";
import { getProductSizeWithPrice, transformCategory } from "../../../utils";
import {
    CategoryDataType,
    CategoryResponse,
    ErrorType,
    GetProductResponse,
    ProductDataType,
} from "../../../types";
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
import { Loader } from "../..";

interface PropType {
    productId: number;
}

const UpdateProduct = ({ productId }: PropType) => {
    const [form] = Form.useForm();
    const [product, setProduct] = useState<ProductDataType>();
    const [categories, setCategories] = useState<CategoryDataType[]>([]);
    const [context, contextHolder] = message.useMessage();
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [availability, setAvailability] = useState<boolean | undefined>(
        false
    );

    const { isLoading } = useQuery({
        queryKey: ["product", productId],
        queryFn: async () => getProduct(productId),
        onSuccess: async ({ data }: GetProductResponse) =>
            setProduct(data.product),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    const { isLoading: categoryLoading } = useQuery({
        queryKey: ["productCategories"],
        queryFn: async () => getCategories(),
        onSuccess: async ({ data }: CategoryResponse) =>
            setCategories(data.categories),
        onError: async (err: AxiosError) => handleOnError(err),
    });

    const handleOnError = (err: AxiosError) => {
        const errors = err.response?.data as unknown as ErrorType;
        context.open({
            type: "error",
            content: errors.error[0].msg,
            duration: 3,
        });
    };

    const { mutate, isLoading: updateProductLoading } = useMutation({
        mutationKey: ["updateProduct", productId],
        mutationFn: async ({
            data,
            productId,
        }: {
            data: FormData;
            productId: number;
        }) => updateProduct(data, productId),
        onSuccess: async () => {
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

        if (fileList.length) {
            formData.append("image", fileList[0].originFileObj as File);
        }

        mutate({ data: formData, productId });
    };

    if (isLoading || !product || updateProductLoading)
        return (
            <div className="flex items-center justify-center h-full w-full">
                <Loader />
            </div>
        );

    return (
        <div>
            {contextHolder}
            <Form
                form={form}
                onFinish={handleOnFinish}
                initialValues={{
                    ...product,
                    category: product.categories[0].name,
                    currency: product.prices[0].currency,
                    ...getProductSizeWithPrice(product.prices),
                }}
            >
                <div className="grid grid-cols-2 gap-4">
                    <Card>
                        <Typography.Paragraph className="text-active">
                            Product Name
                        </Typography.Paragraph>
                        <InputField
                            name="name"
                            placeholder="Enter product name"
                            fieldRules={ProductNameRules}
                            icon={<NameIcon />}
                        />

                        <Typography.Paragraph className="text-active">
                            Product Description
                        </Typography.Paragraph>
                        <TextAreaField
                            name="description"
                            placeholder="Enter Product description"
                            fieldRules={ProductDescriptionRules}
                        />

                        <Typography.Paragraph className="text-active">
                            Product Category
                        </Typography.Paragraph>
                        <SelectField
                            name="category"
                            fieldRules={ProductCategoryRules}
                            options={transformCategory(categories)}
                            placeholder="Product category"
                            isLoading={categoryLoading}
                        />
                    </Card>

                    <Card>
                        <Typography.Paragraph className="text-active">
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

                        <Typography.Paragraph className="text-active pt-2">
                            Product Currency
                        </Typography.Paragraph>
                        <SelectField
                            name="currency"
                            placeholder="Product price currency"
                            fieldRules={ProductPriceCurrencyRules}
                            options={[{ key: "ind", value: "IND" }]}
                            isLoading={false}
                        />

                        <Typography.Paragraph className="text-active">
                            Ingredients
                        </Typography.Paragraph>
                        <InputField
                            placeholder="Enter ingredients"
                            name="ingredients"
                            fieldRules={ProductIngredientsRules}
                            icon={<NameIcon />}
                        />
                    </Card>
                </div>

                <Card className="mt-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div>
                            <Typography.Paragraph className="text-active">
                                Product Discount
                            </Typography.Paragraph>
                            <Form.Item
                                name="discount"
                                rules={ProductDiscountRules}
                            >
                                <InputNumber
                                    placeholder="Product discount"
                                    style={{ width: "100%" }}
                                    min={0}
                                    max={99}
                                />
                            </Form.Item>
                        </div>

                        <div>
                            <Typography.Paragraph className="text-active">
                                Product Currency
                            </Typography.Paragraph>
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
                        </div>

                        <div>
                            <Typography.Paragraph className="text-active">
                                Product Medium Size Price
                            </Typography.Paragraph>
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
                        </div>

                        <div>
                            <Typography.Paragraph className="text-active">
                                Product Large Size Price
                            </Typography.Paragraph>
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
                        </div>

                        <div>
                            <Typography.Paragraph className="text-active">
                                Product Preparation Time
                            </Typography.Paragraph>
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
                            <Typography.Paragraph className="text-active">
                                Product Availability
                            </Typography.Paragraph>
                            <Switch
                                size="small"
                                defaultChecked={availability}
                                onChange={(value) => setAvailability(value)}
                                className="ml-4"
                            />
                        </Typography.Paragraph>
                    </div>
                </Card>

                <Flex justify="end" style={{ marginTop: 20 }}>
                    <Button htmlType="submit" type="primary">
                        Update Product
                    </Button>
                </Flex>
            </Form>
        </div>
    );
};

export default UpdateProduct;
