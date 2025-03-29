// src/services/employeeService.js
import axiosInstance from '@/configs/axios.js';
import Cookies from "js-cookie";

export function getUsers(page = 1, pageSize = 10) {
    return axiosInstance.get(`/admin/employees?page=${page}&pageSize=${pageSize}`, {
        headers: { Authorization: `Bearer ${Cookies.get('access_token')}` },
    });
}

export function createUser(formData) {
    return axiosInstance.post("/admin/employees", formData, {
        headers: {
            Authorization: `Bearer ${Cookies.get('access_token')}`,
            'Content-Type': 'multipart/form-data'
        }
    });
}