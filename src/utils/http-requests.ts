import nodeFetch from 'node-fetch';

const deleteOrGetRequest = (url: string, method: string, headers: any) =>
  nodeFetch(url, {
    method,
    headers,
  });

const postRequest = (url: string, method: string, body: any, headers: any) =>
  nodeFetch(url, {
    method,
    body: JSON.stringify(body),
    headers,
  });

export const get = (url: string, headers: any) => {
  return deleteOrGetRequest(url, 'get', headers).then((res: any) => res.json());
};

export const post = (url: string, body: any, headers: any = {}) => {
  return postRequest(url, 'post', body, headers).then((res: any) => res.json());
};

export const patch = (url: string, body: any, headers: any = {}) => {
  return postRequest(url, 'patch', body, headers).then((res: any) =>
    res.json(),
  );
};

export const deleteReq = (url: string, headers: any = {}) => {
  return deleteOrGetRequest(url, 'delete', headers).then((_: any) => null);
};
