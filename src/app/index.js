import React, { useState, useEffect } from "react";
import { Links, Results, SearchForm, Header, Modal } from "./components";
import  { read } from "./api/Database"
import { authenticateUser } from "./api/Auth"
const constants = {
  BASE_URL: "http://www.omdbapi.com/?", 
  API_KEY: "********"
}

const App = () => {
  const [state, setState] = useState({
    isSearching: false,
    active: "search",
    movies: [],
    favorites: [],
    query: "", 
    currentUser: null
  });
  const onTextChange = input => {
    setState({ ...state, isSearching : input.length > 0, query: input})
  }
  const handleClick = link => {
    setState({ ...state, active : link})
  }
  const toggleFavorite = () => {
    fetchDB(state.currentUser)
  }

  const fetchAPI = () => {
      if (!state.query) { return }
      const url = `${constants.BASE_URL}s=${state.query}&apikey=${constants.API_KEY}`
      console.log(url)
      fetch(url).then(response =>   {
        if (!response.ok) { throw Error(response.statusText)}
        return response.json()
      }).then(data => {
        if (data.Response !== "False") {
          setState({...state, movies: create(data.Search)})
        }

      })
  }

  const fetchDB = user => {
    read()
    .then(snapshot => {
      const favorites = snapshot.docs.filter(doc => doc.data().user === user.email).map(doc => doc.data().item)
      const imdbs = favorites.map(fav => fav.imdb)
      const updated = state.movies.map(movie => {
        movie.isFavorite = imdbs.includes(movie.imdb)     
        return movie
      })
  
      setState({...state, favorites: favorites, movies: updated})
    })
    .catch(err => console.log(err))
  }

  const create = data => {
    const imdbs = state.favorites.map(fav => fav.imdb)
    return data.map(item => {
      return {title: item.Title, imdb: item.imdbID, year: item.Year, type: item.Type, poster: item.Poster, isFavorite: imdbs.includes(item.imdbID)}
    })
  }

  useEffect(() => {
    fetchAPI()
  }, [state.query])
  useEffect(() => {
    authenticateUser().then(user => {
      setState({...state, currentUser: user})
    }).catch(() => {
      setState({...state, currentUser: null})
    })
  }, [state.currentUser])
  useEffect(() => {
    if (state.currentUser) {
      fetchDB(state.currentUser)
    }
  }, [state.currentUser])

  return (
    <div className="App" id="search-container">
      <Modal {...state}/>
      <Header {...state}/>
      <Links {...state} handleClick={handleClick}/>
      <main>
        <SearchForm onTextChange={onTextChange}/>
        <Results {...state} toggleFavorite={toggleFavorite}/>
      </main>
    </div>
  );
};
export default App;
