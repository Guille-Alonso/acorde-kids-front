import axiosOriginal from 'axios'

const axios = axiosOriginal.create({
   baseURL: import.meta.env.VITE_APP_RUTA_BACK
})

axios.interceptors.response.use(
   response => response,
   error => {
     if (error.response && error.response.status === 401) {
       console.log('Token inválido o expirado (401)');

       localStorage.clear();
       const url = new URL(`https://acorde.netlify.app/#/login`);
       window.open(url.toString(), '_self');
     
     }
     return Promise.reject(error);
   }
 );

 export default axios;