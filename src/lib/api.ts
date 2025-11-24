import axios from "axios";

const defaultBaseUrl = "http://localhost:8000/api/v1";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL ?? defaultBaseUrl,
  timeout: 5000,
});


