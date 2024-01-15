import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.params = {
  api_key: 'b3c978c87bc2e93f0b47510b47e87dc4',
};

export async function getTrendingMovies() {
  const response = await axios.get('/trending/movie/day');
  return response.data;
}

export async function searchMovies(query) {
  const response = await axios.get(`/search/movie?query=${query}`);
  return response.data;
}

export async function getDetails(movieId) {
  const response = await axios.get(`/movie/${movieId}`);
  return response.data;
}

export async function getCast(movieId) {
  const response = await axios.get(`/movie/${movieId}/credits`);
  return response.data;
}

export async function getReviews(movieId) {
  const response = await axios.get(`/movie/${movieId}/reviews`);
  return response.data;
}
