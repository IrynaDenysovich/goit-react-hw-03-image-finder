import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com';
const commonKey = '31801640-92314b1461717efb7747c4e31';

export const fetchImages = async (query, page, per_page) => {
  const response = await axios.get('/api/', {
    params: {
      q: query,
      key: commonKey,
      page: page,
      image_type: 'photo',
      orientation: 'horixontal',
      per_page: per_page,
    },
  });

  return response.data;
};