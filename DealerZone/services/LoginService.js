import axios from '../axios';

class LoginService {
  getAll = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get('user')
        .then(res => {
          return resolve(res);
        })
        .catch(er => {
          return resolve(er);
        });
    });
    return await promise;
  };

  loginUser = async data => {
    // console.log(data);
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
