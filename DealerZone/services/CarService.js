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

  getAllByUser = async id => {
    const promise = new Promise((resolve, reject) => {
      axios
        .get('car/by_user/' + id)
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

  saveCar = async formData => {
    const promise = new Promise((resolve, reject) => {
      axios
        .post('car', formData, {
          headers: {
            // Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
          },
        })
        .then(res => {
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
              'Content-Type': 'multipart/form-data',
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
