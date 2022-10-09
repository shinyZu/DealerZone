import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://192.168.1.3:4000/dealer_zone/api/v1/',
});

export default instance;
