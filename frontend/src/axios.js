import axios from 'axios';

export const myAxios = axios.create({
   baseURL: 'http://localhost:8000/pages',
   xsrfCookieName: 'csrftoken',
   xsrfHeaderName: 'X-CSRFToken',
   withCredentials: true,
   auth: {
      username: '',
      password: '',
   }
});