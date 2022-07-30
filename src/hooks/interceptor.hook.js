import axios from "axios";
import { getAuth } from "firebase/auth";

// Add a request interceptor
export const useInterceptor = () => {
    axios.interceptors.request.use(
        async function (config) {
            // Do something before request is sent
            const currentUser = getAuth().currentUser;
            if (currentUser) {
                const { token } = await currentUser.getIdTokenResult();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) =>
            // Do something with request error
            Promise.reject(error)
    );
};
