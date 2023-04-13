const URL = 'https://dog.ceo/api/breed/hound/images';

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    return Promise.reject(err);
  });
};

export const  getData = () => {

  
  return fetch(URL).then(checkResponse);
};