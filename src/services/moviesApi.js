import axios from "axios";

const API_KEY = 'cf2dcd3ffc41a0e9e457c0dc88fdeaf2';
axios.defaults.baseURL = 'https://api.themoviedb.org/3/';

export const getMovies = async () => {
    const { data } = await axios.get(`trending/movie/day?api_key=${API_KEY}`)
    // console.log(data)
    return data;
}

export const getMoviesByQuery = async (query) => {
    const { data } = await axios.get(`search/movie?query=${query}&api_key=${API_KEY}&language=en-US&page=1&include_adult=false`)
    // console.log(data)
    return data;
}

export const getMoviesId = async (movieId) => {
    const { data } = await axios.get(`movie/${movieId}?api_key=${API_KEY}&language=en-US`)
    // console.log(data)
    return data;
}

export const getCastById = async (movieId) => {
    const { data } = await axios.get(`movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`)
    // console.log(data)
    return data;
}

export const getReviewsById = async (movieId) => {
    const { data } = await axios.get(`movie/${movieId}/reviews?api_key=${API_KEY}&language=en-US&page=1`)
    // console.log(data)
    return data;
}
