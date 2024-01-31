import { OtpDataType, SendOtpForRegisterUserData, LoginData } from "../types";
import api from "./client";

export const sendOtpForRegisterUser = (data: SendOtpForRegisterUserData) =>
    api.post("/auth/register/send-otp", data);

export const verifyOtpForRegisterUser = (data: OtpDataType) =>
    api.post("/auth/register/verify-otp", data);

export const self = () => api.get("/auth/self");

export const getUsers = () => api.get("/user");

export const deleteUser = (userId: number) => api.delete(`/user/${userId}`);

export const login = (data: LoginData) => api.post("/auth/login", data);

export const getProducts = (queryString: string) =>
    api.get(`/product?${queryString}`);

export const logout = () => api.get("/auth/logout");

export const getCategories = () => api.get("/category");

export const getProduct = (productId: number) =>
    api.get(`/product/${productId}`);

export const deleteProduct = (productId: number) =>
    api.delete(`/product/${productId}`);
