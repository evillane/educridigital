import axios from "axios";
import Enviroment  from "../Constants/Enviroment";

const instanceSignalr= axios.create({
    baseURL: Enviroment.baseUrlSignalR
});

export default instanceSignalr; 