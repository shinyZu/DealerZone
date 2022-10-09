import axios from 'axios';

const instance = axios.create({
  // baseURL: 'http://localhost:4000/dealer_zone/api/v1/',
  // baseURL: 'http://10.0.2.2:4000/dealer_zone/api/v1/',
  baseURL: 'http://192.168.1.2:4000/dealer_zone/api/v1/',
});

export default instance;
