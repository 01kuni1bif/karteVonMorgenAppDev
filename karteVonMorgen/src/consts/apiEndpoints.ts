// apiEndpoints.ts
export const API_BASE_URL = 'https://dev.ofdb.io/v0';

export const ENDPOINTS = {

  SEARCH: {
    path: '/search',
    flexibleParams: {
      bbox: '42.27,-7.97,52.58,38.25',
      org_tag: '',
      categories: [''], // '2cd00bebec0c48ba9db761da48678134' || '77b3c33a92554bcf8e8c2c86cedd6f6f',
      text: '',
      ids: [''],
      tags: [''],
      status: '',
      limit: NaN
    },
  },

  ENTRIES: {
    path: '/entries/',
    flexibleParams: {
      ids: [''],
      org_tag: '',
    },
  },

  EVENTS_BY_ID: {
    path: '/events/',
    flexibleParams: {
      id: '',
    },
  },

  EVENTS_BY_PARAMS: {
    path: '/events',
    flexibleParams: {
      bbox: '42.27,-7.97,52.58,38.25',
      limit: NaN,
      tag: '',
      start_min: NaN,
      start_max: NaN,
      end_min: NaN,
      end_max: NaN,
      text: '',
      created_by: '',
    },
  }

};
