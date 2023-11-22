import axios from "axios";

//axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL;
         const BASE_URL = "http://127.0.0.1:8000/api";
const apiURL = "http://127.0.0.1:8000";     
         /* const BASE_URL = "https://extranetbsi.bsi-conseil.com/api";
const apiURL = "https://extranetbsi.bsi-conseil.com";   */
 
/**
 *
 * @param {string} entity_url
 */
const getEntity = (entity_url) => {
  return axios.get(BASE_URL + entity_url, {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 *
 * @param {string} entity_url
 * @param {number} id
 */

const getEntityById = (entity_url, id) => {
  return axios.get(BASE_URL + entity_url , {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 *
 * @param {string} entity_url
 * @param {number} id
 */

const deleteEntity = (entity_url, id) => {
  return axios.delete(BASE_URL + entity_url + "/" + id, {
    headers: { "Content-Type": "application/json" },
  });
};

/**
 *
 * @param {string} entity_url - Url for API
 * @param {object} data - Data
 * @param {object} headers
 */

const postEntity = (entity_url, data, headers) => {
  return axios.post(BASE_URL + entity_url, data, {
    headers: { "Content-Type": "application/json" },
  });
};

export { postEntity, getEntityById, getEntity, deleteEntity,apiURL };
