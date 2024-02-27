import axios from "axios";
import { baseURL } from "../constants/constants";

export const api = axios.create({
    baseURL,
});
