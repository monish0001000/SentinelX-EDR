import axios from 'axios';

const API_BASE_URL = 'http://localhost:8000/api/v1';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getEndpoints = () => apiClient.get('/endpoints/');
export const getEndpoint = (id) => apiClient.get(`/endpoints/${id}`);

export const getAlerts = () => apiClient.get('/alerts/');
export const getAlert = (id) => apiClient.get(`/alerts/${id}`);

export const getCases = () => apiClient.get('/cases/');
export const getCase = (id) => apiClient.get(`/cases/${id}`);

export const getDetectionRules = () => apiClient.get('/rules/');
export const getDetectionRule = (id) => apiClient.get(`/rules/${id}`);

export const getMetrics = () => apiClient.get('/metrics/dashboard');
export const getMttd = () => apiClient.get('/metrics/mttd');

export const getThreatIntel = () => apiClient.get('/threat-intel/');

export const getInvestigations = () => apiClient.get('/investigations/');

// Add more API endpoints as needed
export default apiClient;
