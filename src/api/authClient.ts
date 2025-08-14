import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://mis.adani.digital";

const authClient = axios.create({
  baseURL,
  timeout: 20000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default authClient;


