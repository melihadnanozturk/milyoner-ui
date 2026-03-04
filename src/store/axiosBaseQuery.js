import axios from 'axios';

// Panel icin ayri axios instance - global interceptor'dan izole
const panelAxios = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
    withCredentials: true,
});

panelAxios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 || error.response?.status === 403) {
            localStorage.removeItem("adminAccessToken");

            if (window.location.pathname !== '/panel/login') {
                window.location.replace('/panel/login');
            }
        }
        return Promise.reject(error);
    }
);

const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers, skipAuth }, { getState }) => {
            // Get token from localStorage (outside try block for use in catch)
            const token = localStorage.getItem("adminAccessToken");

            try {
                // Merge headers with defaults
                const mergedHeaders = {
                    'Content-Type': 'application/json',
                    ...(headers ?? {}),
                };

                if (token && !skipAuth) {
                    mergedHeaders.Authorization = `Bearer ${token}`;
                }

                const result = await panelAxios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: mergedHeaders,
                });

                return { data: result.data };
            } catch (axiosError) {
                const status = axiosError.response?.status;

                const error = {
                    status: status,
                    data: axiosError.response?.data || axiosError.message,
                };

                // Include error message from response if available
                if (axiosError.response?.data?.message) {
                    error.message = axiosError.response.data.message;
                } else if (typeof axiosError.response?.data === 'string') {
                    error.message = axiosError.response.data;
                } else {
                    error.message = axiosError.message || 'An unexpected error occurred';
                }

                return { error };
            }
        };

export default axiosBaseQuery;
