/**
 * Base API service for making HTTP requests
 */

// API base URL from environment variables
const API_URL = "http://localhost:5000/api"

/**
 * Handles API responses and errors
 * @param {Response} response - The fetch response object
 * @returns {Promise} - Resolved with the response data or rejected with an error
 */
const handleResponse = async (response) => {
  const contentType = response.headers.get("content-type")
  const isJson = contentType && contentType.includes("application/json")

  // Parse the response based on content type
  const data = isJson ? await response.json() : await response.text()

  // If the response is not ok, throw an error
  if (!response.ok) {
    const error = (data && data.message) || response.statusText || "Something went wrong"
    return Promise.reject(new Error(error))
  }

  return data
}

/**
 * Creates the request options for fetch
 * @param {string} method - The HTTP method
 * @param {Object} data - The request payload
 * @returns {Object} - The request options
 */
const createRequestOptions = (method, data = null) => {
  // Get token from localStorage if available
  const token = localStorage.getItem("token")

  // Set default headers
  const headers = {
    "Content-Type": "application/json",
  }

  // Add authorization header if token exists
  if (token) {
    headers["Authorization"] = `Bearer ${token}`
  }

  const options = {
    method,
    headers,
  }

  // Add body if data is provided
  if (data) {
    options.body = JSON.stringify(data)
  }

  return options
}

/**
 * API service with methods for different HTTP requests
 */
const api = {
  /**
   * Performs a GET request
   * @param {string} endpoint - The API endpoint
   * @param {Object} params - Query parameters
   * @returns {Promise} - The response data
   */
  get: async (endpoint, params = {}) => {
    // Convert params object to query string
    const queryString = new URLSearchParams(params).toString()
    const url = `${API_URL}${endpoint}${queryString ? `?${queryString}` : ""}`

    const options = createRequestOptions("GET")
    const response = await fetch(url, options)
    return handleResponse(response)
  },

  /**
   * Performs a POST request
   * @param {string} endpoint - The API endpoint
   * @param {Object} data - The request payload
   * @returns {Promise} - The response data
   */
  post: async (endpoint, data) => {
    const url = `${API_URL}${endpoint}`
    const options = createRequestOptions("POST", data)
    const response = await fetch(url, options)
    return handleResponse(response)
  },

  /**
   * Performs a PUT request
   * @param {string} endpoint - The API endpoint
   * @param {Object} data - The request payload
   * @returns {Promise} - The response data
   */
  put: async (endpoint, data) => {
    const url = `${API_URL}${endpoint}`
    const options = createRequestOptions("PUT", data)
    const response = await fetch(url, options)
    return handleResponse(response)
  },

  /**
   * Performs a DELETE request
   * @param {string} endpoint - The API endpoint
   * @returns {Promise} - The response data
   */
  delete: async (endpoint) => {
    const url = `${API_URL}${endpoint}`
    const options = createRequestOptions("DELETE")
    const response = await fetch(url, options)
    return handleResponse(response)
  },

  /**
   * Performs a PATCH request
   * @param {string} endpoint - The API endpoint
   * @param {Object} data - The request payload
   * @returns {Promise} - The response data
   */
  patch: async (endpoint, data) => {
    const url = `${API_URL}${endpoint}`
    const options = createRequestOptions("PATCH", data)
    const response = await fetch(url, options)
    return handleResponse(response)
  },
}

export default api

