import axios from 'axios';


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

                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers: mergedHeaders,
                });

                return { data: result.data };
            } catch (axiosError) {
                const status = axiosError.response?.status;
                
                if ((status === 401 || status === 403) && token && !skipAuth) {
                    if (baseUrl.includes('/panel') || url.includes('/panel')) {
                        localStorage.removeItem("adminAccessToken");
                        
                        if (window.location.pathname !== '/panel/login') {
                            window.location.replace('/panel/login');
                            return { 
                                error: { 
                                    status: status,
                                    data: 'Authentication required',
                                    silent: true // Flag to indicate this error should not be displayed
                                } 
                            };
                        }
                    }
                }

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