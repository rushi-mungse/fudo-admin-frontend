import { Rule } from "antd/es/form";

export const FullNameRules: Rule[] = [
    {
        required: true,
        message: "Please enter full name",
    },
];

export const EmailRules: Rule[] = [
    {
        required: true,
        message: "Please enter your email",
    },
    {
        type: "email",
        message: "Please enter valid email",
    },
];

export const PasswordRules: Rule[] = [
    {
        required: true,
        message: "Please enter password",
    },
];

export const ConfirmPasswordRules: Rule[] = [
    {
        required: true,
        message: "Please confirm password",
    },
];

export const OtpRules: Rule[] = [
    { required: true, message: "Please enter otp" },
];

export const ProductNameRules: Rule[] = [
    { required: true, message: "Please enter product name" },
];

export const ProductDescriptionRules: Rule[] = [
    { required: true, message: "Please enter product description" },
];

export const ProductCategoryRules: Rule[] = [
    { required: true, message: "Please enter product category" },
];

export const ProductAvailabilityRules: Rule[] = [
    { required: true, message: "Please enter product availability" },
];

export const ProductIngredientsRules: Rule[] = [
    { required: true, message: "Please enter product ingredients" },
];

export const ProductDiscountRules: Rule[] = [
    { required: true, message: "Please enter product discount" },
];

export const ProductSmallSizePriceRules: Rule[] = [
    { required: true, message: "Please enter product small size price" },
];

export const ProductMediumSizePriceRules: Rule[] = [
    { required: true, message: "Please enter product medium size price" },
];

export const ProductLargeSizePriceRules: Rule[] = [
    { required: true, message: "Please enter product large size price" },
];

export const ProductPriceCurrencyRules: Rule[] = [
    { required: true, message: "Please enter product price currency" },
];

export const ProductPreparationTimeRules: Rule[] = [
    { required: true, message: "Please enter product preparation time" },
];
