import axios from "axios";

export function axiosGet<T>(url: string, data: T | null = null) {
  return axios.get(`${process.env.REACT_APP_API_URL}${url}`, {
    params: data,
  });
}

export function axiosPost<T>(url: string, data: T | object) {
  return axios.post(`${process.env.REACT_APP_API_URL}${url}`, data);
}

export const axiosPatch = (url: string, data: object) => {
  return axios.patch(`${process.env.REACT_APP_API_URL}${url}`, data);
};

export const axiosPut = (url: string, data: object) => {
  return axios.put(`${process.env.REACT_APP_API_URL}${url}`, data);
};

export const axiosDelete = (url: string) => {
  return axios.delete(`${process.env.REACT_APP_API_URL}${url}`);
};
