// src/lib/api/endpoints.js
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const EndPoint = {
  // auth
  LOGIN: `${API_BASE_URL}/login/`,
  REGISTER: `${API_BASE_URL}/register/`,
  LOGOUT: `${API_BASE_URL}/logout/`,
  PROFILE: `${API_BASE_URL}/profile/`,

  // categories 
  CATEGORYLIST: `${API_BASE_URL}/categories/`,
  CATEGORYCREATE: `${API_BASE_URL}/categories/create/`,
  CATEGORYDETAIL: (id) => `${API_BASE_URL}/categories/${id}/`,
  CATEGORYUPDATE: (id) => `${API_BASE_URL}/categories/${id}/update/`,
  CATEGORYDELETE: (id) => `${API_BASE_URL}/categories/${id}/delete/`,

  // transactions 
  TRANSACTIONLIST: `${API_BASE_URL}/transactions/`,
  TRANSACTIONCREATE: `${API_BASE_URL}/transactions/create/`,
  TRANSACTIONDETAIL: (id) => `${API_BASE_URL}/transactions/${id}/`,
  TRANSACTIONUPDATE: (id) => `${API_BASE_URL}/transactions/${id}/update/`,
  TRANSACTIONDELETE: (id) => `${API_BASE_URL}/transactions/${id}/delete/`,
  TRANSACTIONSUMMARY: `${API_BASE_URL}/transactions/summary/`,

  // goals 
  GOALLIST: `${API_BASE_URL}/goals/`,
  GOALUPSERT: `${API_BASE_URL}/goals/upsert/`,
  GOALDETAIL: (id) => `${API_BASE_URL}/goals/${id}/`,
  GOALDELETE: (id) => `${API_BASE_URL}/goals/${id}/delete/`,
};
