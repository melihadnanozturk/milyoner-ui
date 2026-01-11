import axios from 'axios';

/**
 * Custom base query for RTK Query using axios
 * Supports authentication, skipAuth option, and proper error handling
 * 
 * @param {Object} options - Configuration options
 * @param {string} options.baseUrl - Base URL for all requests
 * @returns {Function} Base query function for RTK Query
 */
const axiosBaseQuery =
    ({ baseUrl } = { baseUrl: '' }) =>
        async ({ url, method, data, params, headers, skipAuth }, { getState }) => {
            try {
                // Get token from Redux state or localStorage
                const state = getState?.();
                const tokenFromState = state?.adminAuth?.token || state?.game?.token;
                const tokenFromStorage = localStorage.getItem("adminAccessToken");
                const token = tokenFromState || tokenFromStorage;

                // Merge headers with defaults
                const mergedHeaders = {
                    'Content-Type': 'application/json',
                    ...(headers ?? {}),
                };

                // Add Authorization header if token exists and skipAuth is not true
                if (token && !skipAuth) {
                    mergedHeaders.Authorization = `Bearer ${token}`;
                }

                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: mergedHeaders,
                });

                return { data: result.data };
            } catch (axiosError) {
                // Enhanced error handling
                const error = {
                    status: axiosError.response?.status,
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