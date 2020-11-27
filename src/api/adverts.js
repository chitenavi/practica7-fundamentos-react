import client from './client';

const adverstUrl = 'apiv1/adverts';

export const getAdverts = (filterParams = '') => {
  const url = `${adverstUrl}?${filterParams}`;
  return client.get(url);
};

export const getAdvertDetail = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.get(url);
};

export const deleteAdvert = advertId => {
  const url = `${adverstUrl}/${advertId}`;
  return client.delete(url);
};

// export const createAdvert = tweet => {
//   const url = `${adverstUrl}`;
//   return client.post(url, tweet);
// };
