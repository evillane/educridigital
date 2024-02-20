import axios from 'axios';
import Enviroment from './Shared/Constants/Enviroment';

const instance= axios.create({
    baseURL: Enviroment.baseUrl
});

export default instance;