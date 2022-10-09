import axios from '../axios';

class CarService {
  getAll = async () => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get('car')
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

export default new CarService();
