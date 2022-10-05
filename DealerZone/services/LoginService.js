import axios from '../axios';

class LoginService {
  loginUser = async data => {
    console.log('==================2==================');
    console.log(data);
    console.log('====================================');
    const promise = new Promise((resolve, reject) => {
      axios
        .post('login', data)
        .then(res => {
          console.log('4');
          return resolve(res);
        })
        .catch(er => {
          console.log('5');
          return resolve(er);
        });
    });
    return await promise;
  };
}

export default new LoginService();
