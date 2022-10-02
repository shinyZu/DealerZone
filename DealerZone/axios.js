import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4000/dealer_zone/api/v1/',
  //header
  //timeout
});

export default instance;
