// UserService.js
import axios from '../utils/request';


const homeService = {
  getUser(id) {
    return axios.get(`/api/getuser`,{"ddd":id});
  }
};

export default homeService;
