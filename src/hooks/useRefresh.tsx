import { useQuery } from "react-query";
import { useAppDispatch } from "./reduxHooks";
import { self } from "../apis";
import { setAuth } from "../store/slices/auth";

const useRefreshHook = () => {
    const dispatch = useAppDispatch();

    const { isLoading, isError } = useQuery({
        queryKey: ["userData"],
        queryFn: self,
        onSuccess: ({ data }) => dispatch(setAuth(data)),
        retry: false,
    });

    return { isError, isLoading };
};

export default useRefreshHook;
