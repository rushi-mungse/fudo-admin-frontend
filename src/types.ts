export type Maybe<T> = T | null;

export interface LinkType {
    to: string;
    text: string;
}

export interface SendOtpForRegisterUserData {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface OtpInfoData {
    email: string;
    fullName: string;
    hashOtp: string;
}

export interface SendOtpForRegisterUserResponseData {
    message: string;
    otp: string;
    otpInfo: OtpInfoData;
}

export interface HttpErrorType {
    type: string;
    msg: string;
    path: string;
    location: string;
}
export interface ErrorType {
    error: HttpErrorType[];
}

export interface OtpDataType {
    email: string;
    fullName: string;
    hashOtp: string;
    otp?: string;
}

export interface VerifyOtpForRegisterResponseData {
    user: UserDataType;
    message: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface UserColumnType {
    id: number;
    fullName: string;
    email: string;
    phoneNumber: string;
    role: string;
    avatar: string;
}

export interface UserDataResponse {
    data: { users: UserDataType[] };
    message: string;
}

export interface ProductResponse {
    data: { products: ProductDataType[] };
}

export interface GetProductResponse {
    data: { product: ProductDataType };
}

export interface CategoryResponse {
    data: { categories: CategoryDataType[] };
}

/* all data type */
export interface ShippingDataType {
    id: number;
    address: string;
    country: string;
    city: string;
    postalCode: string;
}

export interface UserDataType {
    id: number;
    fullName: string;
    email: string;
    role: string;
    phoneNumber: Maybe<string>;
    conuntryCode: Maybe<string>;
    avatar: Maybe<string>;
    status: string;
    shippings: ShippingDataType[];
}

export interface CategoryDataType {
    id: number;
    name: string;
}

export interface ProductDataType {
    id: number;
    name: string;
    description: string;
    availability: boolean;
    imageUrl: string;
    preparationTime: number;
    discount: number;
    ingredients: string[];
    categories: CategoryDataType[];
    prices: ProductPriceDataType[];
}

export interface ProductSizeDataType {
    id: number;
    size: string;
}

export interface ProductPriceDataType {
    id: number;
    price: number;
    currency: string;
    size: ProductSizeDataType;
}

export interface PaymentDataType {
    id: number;
    amount: number;
    method: string;
}

export interface OrderItemDataType {
    id: number;
    quantity: number;
}

export interface OrderDataType {
    id: number;
    orderItems: OrderItemDataType[];
    status: string;
    shipping: ShippingDataType;
    payment: PaymentDataType;
}

export interface ItemDataType {
    [key: string]: number;
}

export interface CartDataType {
    items: ItemDataType;
    totalItems: number;
}

export interface CategoryData {
    value: string;
    key: string;
}

export interface CreateProductData {}
