import axios from "axios";
import { baseUrl } from "../Constant/Url.Constant";

const httpmodul = axios.create(
    {
        baseURL :baseUrl,
    }
)
export default httpmodul;