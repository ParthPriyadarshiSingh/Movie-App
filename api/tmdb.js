import axios from 'axios'
import { apiKey } from '../constants'

const baseUrl = 'https://api.themoviedb.org/3'
const trendingEndpoint = `${baseUrl}/trending/movie/day?api_key=${apiKey}`
const upcomingEndpoint = `${baseUrl}/movie/upcoming?api_key=${apiKey}`
const topRatedEndpoint = `${baseUrl}/movie/top_rated?api_key=${apiKey}`

const movieDetailsEndpoint = `${baseUrl}/movie/${id}?api_key=${apiKey}`
const movieCreditsEndpoint = `${baseUrl}/movie/${id}/credits?api_key=${apiKey}`
const similarMoviesEndpoint = `${baseUrl}/movie/${id}/similar?api_key=${apiKey}`

export const image500 = path => path ? `https://image.tmdb.org/t/p/w500${path}` : null
export const image342 = path => path ? `https://image.tmdb.org/t/p/w342${path}` : null
export const image185 = path => path ? `https://image.tmdb.org/t/p/w185${path}` : null

const apiCall = async (endpoint, params) => {
    const options = {
        method: 'GET',
        url: endpoint,
        params: params ? params : {}
    }

    try {
        const response = await axios.request(options)
        return response.data
    } catch (error) {
        console.log('error:', error);
        return {}
    }
}
export const fetchTrendingMovies = () => {
    return apiCall(trendingEndpoint)
}
export const fetchUpcomingMovies = () => {
    return apiCall(upcomingEndpoint)
}
export const fetchTopRatedMovies = () => {
    return apiCall(topRatedEndpoint)
}

export const fetchMovieDetails = id => {
    return apiCall(movieDetailsEndpoint(id))
}
export const fetchMovieCredits = id => {
    return apiCall(movieCreditsEndpoint(id))
}
export const fetchSimilarMovies = id => {
    return apiCall(similarMoviesEndpoint(id))
}