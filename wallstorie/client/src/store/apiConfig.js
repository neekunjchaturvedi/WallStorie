import axios from "axios";

const baseURL = import.meta.env.VITE_PORT;

// Create an API client instance with consistent configuration
const apiClient = axios.create({
  baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get CSRF token from cookies
const getCsrfToken = () => {
  const match = document.cookie.match(new RegExp("(^| )XSRF-TOKEN=([^;]+)"));
  if (match) return match[2];
  return null;
};

// Add request interceptor to include auth token and CSRF token
apiClient.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token if exists and it's not a GET request
    if (config.method !== "get") {
      const csrfToken = getCsrfToken();
      if (csrfToken) {
        config.headers["X-XSRF-TOKEN"] = csrfToken;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor to handle token expiration
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // If token has expired and we haven't already tried to refresh it
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Attempt to refresh the token
        const response = await axios.post(
          `${baseURL}/api/auth/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        if (response.data.success && response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
          apiClient.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          originalRequest.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, redirect to login
        console.error("Failed to refresh token:", refreshError);
        localStorage.removeItem("accessToken");
        window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;
