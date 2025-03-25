const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
axios.defaults.withCredentials = true;

// axiosInstance.interceptors.response.use(
//     response => {
//         return response;
//     },
//     error => {
//         return Promise.reject(error);
//     }
// );


// axiosInstance.interceptors.request.use(config => {
//     const token = getCookie('access_token')
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`
//     }
//     return config
// })

// // Hàm đọc cookie
// function getCookie(name) {
//     const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
//     return match ? match[2] : null
// }

export default axiosInstance;