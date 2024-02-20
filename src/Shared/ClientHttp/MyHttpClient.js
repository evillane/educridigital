import axios from "axios";
import Enviroment  from "../Constants/Enviroment";

const instance= axios.create({
    baseURL: Enviroment.baseUrl
});

export default instance; 