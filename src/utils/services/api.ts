import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_BASEURL_API}`

export const api = axios.create({ baseURL: BASE_URL});