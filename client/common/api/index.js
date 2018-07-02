import axios from 'axios';

const apiUrl = process.env.DATA_API_URL;

export function getQuestions() {
  return new Promise((resolve, reject) => {
    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    .then(response => resolve(response.data.results))
    .catch(error => reject(error));
  });
}

export default function api() {
  return {
    getQuestions,
  };
}
