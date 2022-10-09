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

  getCarImage = async filename => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get('car/file/' + filename)
        .then(res => {
          return resolve(res);
        })
        .catch(er => {
          return resolve(er);
        });
    });
    return await promise;
  };

  saveCar = async data => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post('car', data, {
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
          console.log('====================================');
          console.log(res.data);
          console.log('====================================');
          return resolve(res);
        })
        .catch(er => {
          return resolve(er);
        });
    });
    return await promise;
  };

  updateCar = async (id, formData) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put(
          'car/' + id,
          formData,
          {
            headers: {
              // Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
              // Authorization: 'Basic YnJva2VyOmJyb2tlcl8xMjM=',
            },
          },
          {
            transformRequest: (data, headers) => {
              return formData;
            },
          },
        )
        .then(res => {
          return resolve(res);
        })
        .catch(er => {
          return resolve(er);
        });
    });
    return await promise;
  };

  deleteCar = async id => {
    const promise = new Promise((resolve, reject) => {
      axios
        .delete('car/' + id)
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
