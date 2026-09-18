const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const ENDPOINT = {
    LOGIN: `${API_BASE_URL}/login`,
    REGISTER: `${API_BASE_URL}/register`,
    ME: `${API_BASE_URL}/me`,
    LOGOUT: `${API_BASE_URL}/logout`
} as const;

export type EndpointKeys = keyof typeof ENDPOINT;