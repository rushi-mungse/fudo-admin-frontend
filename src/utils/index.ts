import {
    CategoryData,
    CategoryDataType,
    ProductPriceDataType,
    ProductSizeAndPriceType,
} from "../types";

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

export const getProductSizeWithPrice = (
    prices: ProductPriceDataType[]
): ProductSizeAndPriceType => {
    let small, medium, large;
    prices.map((price) => {
        if (price.size.size === "small") small = price.price;
        else if (price.size.size === "medium") medium = price.price;
        else if (price.size.size === "large") large = price.price;
    });

    if (!small || !medium || !large) throw Error("Product size not found!");

    return {
        small,
        medium,
        large,
    };
};

export const getTotal = (price: number, quantity: number) => {
    return price * quantity;
};

export const getProductPrice = (
    prices: ProductPriceDataType[],
    productSize: string
): number => {
    const data = getProductSizeWithPrice(prices);
    if (productSize === "small") return data.small;
    else if (productSize === "medium") return data.medium;
    else if (productSize === "large") return data.large;
    return 0;
};
