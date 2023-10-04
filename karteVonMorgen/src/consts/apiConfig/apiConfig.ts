// apiConfig.js
export const API_BASE_URL = 'https://dev.ofdb.io/v0';
export const DEFAULT_API_LIMIT = 20;

// Define endpoints and their corresponding query parameters
export const ENDPOINTS = {
  SEARCH: {
    path: '/search',
    defaultQueryParams: {
      bbox: '42.27,-7.97,52.58,38.25',
    },
    flexibleParams: {
      text: '', // Default value for 'text' parameter
      company: '77b3c33a92554bcf8e8c2c86cedd6f6f',
      initative: '2cd00bebec0c48ba9db761da48678134', // Default value for 'categories' parameter
      ids: '',
      tags: '',
      status: '',
    },
  },
  TAGS: {
    path: '/tags',


  },
  EVENTS: {
    path: '/events',
    defaultQueryParams: {
      // Add default params for this endpoint if needed
    },
    flexibleParams: {
      bbox: '', // Default value for 'param1' parameter
      tag: '', // Default value for 'param2' parameter
      text: '',
      start_min: null,
      start_max: null,
      end_min: null,
      end_max: null,
      created_by: '',
    },
  },
  ENTRIES: {
    path: '/entries',
    defaultQueryParams: {
      // Add default params for this endpoint if needed
    },
    flexibleParams: {
      id: '', // Default value for 'param1' parameter
      org_tag: '', // Default value for 'param2' parameter
    },
  },
};
