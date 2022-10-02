import axios from '../axios';

class UserService {
  registerUser = async data => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post('category', data)
        .then(res => {
          return resolve(res);
        })
        .catch(er => {
          return resolve(er);
        });
    });
    return await promise;
  };
}

export default new UserService();
