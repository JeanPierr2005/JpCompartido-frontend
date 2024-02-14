import axios from "./axios";

const BASE_REST_API_URL = "http://localhost:8080/CityUrban/";

class UserService {
  // **USUARIOS**

  getAllUsers() {
    return axios.get(`${BASE_REST_API_URL}Users/List`);
  }

  getUserById(userId) {
    return axios.get(`${BASE_REST_API_URL}Users/List/${userId}`);
  }

  createUser(user) {
    return axios.post(`${BASE_REST_API_URL}Users/Register`, user);
  }

  modifyUser(userId, user) {
    return axios.put(`${BASE_REST_API_URL}Users/Modificar/${userId}`, user);
  }

  deleteUser(userId) {
    return axios.delete(`${BASE_REST_API_URL}/Users/${userId}`);
  }

  // **DIRECCIONES**

  getAllAddress() {
    return axios.get(`${BASE_REST_API_URL}Address/List`);
  }

  getAddressById(addressId) {
    return axios.get(`${BASE_REST_API_URL}Address/List/${addressId}`);
  }

  registerAddress(address) {
    return axios.post(`${BASE_REST_API_URL}Address/Register`, address);
  }

  modifyAddress(addressId, address) {
    return axios.put(`${BASE_REST_API_URL}Address/Modificar/${addressId}`, address);
  }

  deleteAddress(addressId) {
    return axios.delete(`${BASE_REST_API_URL}Address/${addressId}`);
  }
}

const userService = new UserService();

export default userService;
