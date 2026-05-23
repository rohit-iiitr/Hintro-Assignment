const BASE_URL = 'http://localhost:3001';

/**
 * Common fetch handler that injects appropriate headers
 * @param {string} endpoint 
 * @param {string} userId 
 * @param {object} options 
 * @returns {Promise<any>}
 */
async function fetchFromApi(endpoint, userId = 'u1', options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    'x-user-id': userId,
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`API Fetch Error [${endpoint}]:`, error);
    throw error;
  }
}

/**
 * Fetches user profile data
 * @param {string} userId 
 * @returns {Promise<object>}
 */
export const getProfile = (userId) => {
  return fetchFromApi('/api/auth/profile', userId);
};

/**
 * Fetches dashboard details (subscription, file usage, etc.)
 * @param {string} userId 
 * @returns {Promise<object>}
 */
export const getDashboard = (userId) => {
  return fetchFromApi('/api/auth/dashboard', userId);
};

/**
 * Fetches call session aggregated metrics
 * @param {string} userId 
 * @returns {Promise<object>}
 */
export const getCallSessionStats = (userId) => {
  return fetchFromApi('/api/call-sessions/stats', userId);
};

/**
 * Fetches list of call session logs
 * @param {string} userId 
 * @param {number} limit 
 * @returns {Promise<object>}
 */
export const getCallHistory = (userId, limit = 10) => {
  return fetchFromApi(`/api/call-sessions?limit=${limit}`, userId);
};
