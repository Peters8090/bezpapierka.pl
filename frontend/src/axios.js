import axios from 'axios';

export const axiosInstance = axios.create({
   baseURL: 'http://localhost:8000/pages',
   xsrfCookieName: 'csrftoken',
   xsrfHeaderName: 'X-CSRFToken',
   withCredentials: true,
});