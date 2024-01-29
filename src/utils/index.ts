import { CategoryData, CategoryDataType, ProductPriceDataType } from "../types";

export const roundCartItems = (totalItems: number): string => {
    if (totalItems >= 99) return "99+";
    return String(totalItems);
};

export const transformCategory = (
    categories: CategoryDataType[]
): CategoryData[] => {
    const transformCategory: CategoryData[] = [];
    categories.map((category) => {
        transformCategory.push({ key: category.name, value: category.name });
    });
    return transformCategory;
};

export const getProductSizeWithPrice = (prices: ProductPriceDataType[]) => {
    return {
        [prices[0].size.size]: prices[0].price,
        [prices[1].size.size]: prices[1].price,
        [prices[2].size.size]: prices[2].price,
    };
};
