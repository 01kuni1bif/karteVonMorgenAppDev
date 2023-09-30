import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_BASE_URL, ENDPOINTS } from '../consts/apiConfig/apiConfig';

export function useSearch(
  bbox: string | null = null, // Bounding Box (always present)
  org_tag: string | null = null,
  categories: string | null = null,
  text: string | null = null,
  ids: string | null = null,
  tags: string | null = null,
  status: string | null = null,
  limit: number | null = null) {

  const [data, setData] = useState<any>(null);
  let baseUrl = `${API_BASE_URL}${ENDPOINTS.SEARCH.path}`;

  if (!bbox) {
    bbox = '42.27,-7.97,52.58,38.25';
  }

  const queryParams = {
    bbox: bbox,
    org_tag: `${org_tag}`, // Organizational Tag (optional)
    categories: `${status}`, // Categories (optional)
    text: `${text}`, // Text search (optional)
    ids: `${ids}`, // IDs (optional)
    tags: `${tags}`, // Tags (optional)
    status: `${status}`, // Status (optional)
    limit: limit, // Limit (optional, default value: 20)
  };

  // Add the optional parameters if they are present
  baseUrl += `?bbox=${encodeURIComponent(queryParams.bbox)}`
  if (org_tag) baseUrl += `&org_tag=${encodeURIComponent(queryParams.org_tag)}`;
  if (categories) baseUrl += `&categories=${encodeURIComponent(queryParams.categories)}`;
  if (text) baseUrl += `&text=${encodeURIComponent(queryParams.text)}`;
  if (ids) baseUrl += `&ids=${encodeURIComponent(queryParams.ids)}`;
  if (tags) baseUrl += `&tags=${encodeURIComponent(queryParams.tags)}`;
  if (status) baseUrl += `&status=${encodeURIComponent(queryParams.status)}`;
  if (limit) baseUrl += `&limit=${queryParams.limit}`;

  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => {
        if (response.data && response.data.visible && Array.isArray(response.data.visible)) {
          setData(response.data.visible);
        } else {
          console.error('Invalid data in API response');
        }
      })
      .catch((error) => {
        console.error('Error in API request:', error);
      });
  }, [bbox]); // Include bbox in the dependency array


  return data;
}
