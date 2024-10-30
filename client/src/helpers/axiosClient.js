import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:4000',
  // baseURL: 'https://fase2.fathanabds.online/',
});

export default axiosClient;
