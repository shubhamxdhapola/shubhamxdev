import axios from "axios";

// Read CMS base URL from Vite environment variable
const CMS_API_URL = import.meta.env.VITE_CMS_API_URL || "http://localhost:5000/api";

export const apiClient = axios.create({
  baseURL: CMS_API_URL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Response interceptor for sensible error extraction and clean payload unwrapping
apiClient.interceptors.response.use(
  (response) => {
    // Return standard success payload
    return response.data;
  },
  (error) => {
    const message =
      error.response?.data?.message ||
      error.message ||
      "An unexpected error occurred while communicating with the CMS.";
    
    // Create an informative Error object without leaking secrets or credentials
    const enhancedError = new Error(message);
    enhancedError.status = error.response?.status;
    enhancedError.data = error.response?.data;
    
    return Promise.reject(enhancedError);
  }
);

export default apiClient;
