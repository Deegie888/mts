import Axios from "axios";

const axios = Axios.create({
   baseURL: 'http://192.168.88.213:8000',
    // baseURL: 'http://127.0.0.1:8000',
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios