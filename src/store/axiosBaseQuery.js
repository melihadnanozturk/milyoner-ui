import axios from 'axios'

//todo: burada baseUrl vermedik, kontrol et
const axiosBaseQuery =
    ({baseUrl} = {baseUrl: ''}) =>
        async ({url, method, data, params, headers}, {getState}) => {
            try {
                const state = getState?.();
                const tokenFromState = state?.adminAuth?.token || state?.game?.token; // ihtiyacına göre düzenle
                const tokenFromStorage = localStorage.getItem("adminAccessToken"); // senin kullandığın key
                const token = tokenFromState || tokenFromStorage;

                console.log("axiosBaseQuery",token);

                // 2) Header'ları birleştir + Authorization ekle
                const mergedHeaders = {
                    ...(headers ?? {}),
                };

                // login gibi çağrılarda skipAuth: true gönderebilirsin
                if (token) {
                    console.log("TOKEN_EKLENDI","TRUE");

                    mergedHeaders.Authorization = `Bearer ${token}`;
                }


                const result = await axios({
                    url: baseUrl + url,
                    method,
                    data,
                    params,
                    headers:mergedHeaders,
                });
                return {data: result.data};
            } catch (axiosError) {
                return {
                    error: {
                        status: axiosError.response?.status,
                        data: axiosError.response?.data || axiosError.message,
                    },
                };
            }
        };

export default axiosBaseQuery;