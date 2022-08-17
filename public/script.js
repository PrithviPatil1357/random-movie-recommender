import {populateGenreDropdown, getSelectedGenre, getRandomMovie, displayMovie, clearCurrentMovie} from "./helpers.js";
const tmdbKey = 'e909729724784bd78aa84ff21ae18863';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';
const playBtn = document.getElementById('playBtn');

const getGenres = async() => {
  const genreRequestEndpoint = "/genre/movie/list";
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = tmdbBaseUrl+genreRequestEndpoint+requestParams;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      const genres = jsonResponse['genres'];
      return genres;
    }
  }catch(error){
    console.error(error)
  }
};

const getMovies = async() => {
  const selectedGenre = getSelectedGenre();
  const discoverMovieEndpoint = "/discover/movie";
  const requestParams = `?api_key=${tmdbKey}&with_genres=${selectedGenre}`;
  const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
        if(response.ok){
      const jsonResponse = await response.json();
      console.log(jsonResponse);
      let movies = jsonResponse['results'];
      console.log(movies);
      return movies;
    }
  }catch(error){
    console.error(error);
  } 
};
getMovies();

const getMovieInfo = async(movie) => {
  const movieId = movie.id;
  const movieEndpoint = `/movie/${movieId}`;
  const requestParams = `?api_key=${tmdbKey}`;
  const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;
  try{
    const response = await fetch(urlToFetch);
    if(response.ok){
      const movieInfo = await response.json();
      return movieInfo;
    }
  }catch(error){
    console.error(error)
  }
};



// Gets a list of movies and ultimately displays the info of a random movie from the list
 const showRandomMovie = async() => {
    const movieInfo = document.getElementById('movieInfo');
    if (movieInfo.childNodes.length > 0) {
      clearCurrentMovie();
    };
    let movies = await getMovies();
    let randomMovie = getRandomMovie(movies);
    return await getMovieInfo(randomMovie);
  };


  export const displayRandomMovie = () =>{
    showRandomMovie().then( info =>{
        console.log(`here: ${info}`);
        displayMovie(info);
    });
  }

  // // After liking a movie, clears the current movie from the screen and gets another random movie
  const likeAndRefresh = () =>{
      clearCurrentMovie();
      displayRandomMovie();
  }

  // // After disliking a movie, clears the current movie from the screen and gets another random movie
  const dislikeAndRefresh = () =>{
    clearCurrentMovie();
    displayRandomMovie();
}


likeBtn.onclick = likeAndRefresh;
dislikeBtn.onclick = dislikeAndRefresh;
getGenres().then(populateGenreDropdown);
playBtn.onclick = displayRandomMovie;