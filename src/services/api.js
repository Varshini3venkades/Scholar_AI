// Frontend API Client connecting React to the Express/Supabase backend

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api/v1';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  try {
    const response = await fetch(url, { ...options, headers });
    const json = await response.json();
    if (!response.ok) {
      throw new Error(json.error || `Request failed with status ${response.status}`);
    }
    return json;
  } catch (error) {
    console.warn(`[API Client] Error on ${endpoint}:`, error.message);
    throw error;
  }
}

export const api = {
  // 1. Healthcheck
  checkHealth: () => request('/health'),

  // 2. Student Profile
  getProfile: (token) => 
    request('/profile', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  saveProfile: (profileData, token) =>
    request('/profile', {
      method: 'POST',
      body: JSON.stringify(profileData),
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  // 3. Scholarships
  getScholarships: (params = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, val]) => {
      if (val !== undefined && val !== null && val !== '') {
        searchParams.append(key, val);
      }
    });
    const qs = searchParams.toString();
    return request(`/scholarships${qs ? `?${qs}` : ''}`);
  },

  getScholarshipById: (id) => request(`/scholarships/${id}`),

  // 4. Eligibility Matching
  getMatches: (studentData = null, token) =>
    studentData
      ? request('/matching', {
          method: 'POST',
          body: JSON.stringify(studentData),
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        })
      : request('/matching', {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }),

  // 5. Dashboard Summary
  getDashboard: (token) =>
    request('/dashboard', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  // 6. Application Tracker
  getTrackedApplications: (token) =>
    request('/tracker', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  saveTrackedApplication: (payload, token) =>
    request('/tracker', {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  deleteTrackedApplication: (scholarshipId, token) =>
    request(`/tracker/${scholarshipId}`, {
      method: 'DELETE',
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  // 7. Financial Aid Calculator
  calculateAidGap: (financials, token) =>
    request('/calculator/gap-analysis', {
      method: 'POST',
      body: JSON.stringify(financials),
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
};
