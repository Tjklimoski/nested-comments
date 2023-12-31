import axios from "axios";

const API_VERSION = "v1";

const api = axios.create({
  // origin defaults to window origin
  baseURL: `/api/${API_VERSION}`,
  withCredentials: true,
});

export async function makeRequest(path, options) {
  return api(path, options)
    .then(res => res.data)
    .catch(err =>
      Promise.reject(
        err?.response?.data?.message ?? err?.response?.data ?? "Error"
      )
    );
}
