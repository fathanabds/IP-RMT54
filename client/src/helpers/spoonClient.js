import axios from 'axios';

const spoonClient = axios.create({
  baseURL: 'http://localhost:3000/',
});

export default spoonClient;
