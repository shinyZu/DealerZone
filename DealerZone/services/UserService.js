import axios from '../axios';

class UserService {
  registerUser = async formData => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post('user', formData)
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
