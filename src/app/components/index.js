import React, {useState, Fragment } from "react";
import { write, remove } from "../api/Database"
import { Forms } from "./auth/index"

export const Header = ({ currentUser })=> {
  return (
    <header>
      <span>
        My Flix <i className="fas fa-video video"></i>
      </span>
      { currentUser ? 
        <button className="btn btn-link login" data-toggle="modal" data-target="#modal"><i class="fas fa-user fa-2x"></i></button> :
        <button className="btn btn-link login" data-toggle="modal" data-target="#modal"><i class="fas fa-sign-in-alt"></i>  &nbsp;login</button>
      }
     
    </header>
  );
};
export const Modal = ({ currentUser }) => (
  <div
    className="modal fade"
    id="modal"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div className={`modal-dialog ${currentUser ? 'modal-sm' : 'modal-lg'}`} role="document">
      <div className="modal-content">
        <div className="modal-header">
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class={`modal-body ${!currentUser && 'forms'}`}>
          <Forms currentUser={currentUser}/>
        </div>
      </div>
    </div>
  </div>
);

const Links = ({ currentUser, active, handleClick }) => (  
  <nav>
    {["search", "favorites"].map(link => {
      const isDisabled = !currentUser && link === "favorites" 
      return <a href="#" className={`${isDisabled ? "disabled" : "hover"} ${active === link && 'active'} " `} onClick={() => {
        if (!isDisabled) {
          handleClick(link)
        }
      }}>{link.toUpperCase()}</a>;
    })}
  </nav>
);

const FavoriteBtn = ({ result, toggleFavorite }) => {
  return (
    <button className={result.isFavorite ? 'favorite' : 'not-favorite'} 
      onClick={() => {
      result.isFavorite ? remove(result) : write(result)
      toggleFavorite()
    }}>
      {result.isFavorite ? 
        <Fragment>
       <i className="fas fa-star"></i> <span>&nbsp; Remove </span> 
        </Fragment> :
        <Fragment>
         <i class="far fa-star"></i> <span>&nbsp; Add Favorite</span>
        </Fragment>
      }
      
    </button>
  );
};

const Result = ({ result, toggleFavorite, active }) => {
  return (
    <article className="movie d-flex">
      <div className="p-4 movie d-flex flex-fill">
        {result.poster ? 
        <div
        className="p-1 poster"
        style={{
          backgroundImage: `url(${result.poster}`,
          backgroundSize: "cover"
        }}
      ></div> :
      <div
          className="p-1 poster"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL +
              `/placeholder.png`}`,
            backgroundSize: "cover"
          }}
        ></div>}
        <div className="p-4">
          <h2>
            <a target="_blank" href="#">
              {result.title}
            </a>
            <span>({result.year})</span>
          </h2>
          <p>{result.imdb}</p>
        </div>
      </div>
      <FavoriteBtn flex="p-1" toggleFavorite={ toggleFavorite} active={active} result={result}/>
    </article>
  );
};
const SearchForm = ({ onTextChange }) => {
  return (
    <form className="search" onSubmit={e => console.log(`searching query`)}>
      <div>
        <input
          type="text"
          id="title"
          placeholder="Search movie title..."
          defaultValue=""
          onChange={e => onTextChange(e.target.value)}
        />
        <button type="submit" className="btn btn-danger">
          <i className="fas fa-search"></i>
        </button>
      </div>
      <p class="error"></p>
    </form>
  );
};

const Results = ({ movies, favorites, isSearching, active, toggleFavorite}) => {
  const results = active === 'search' ? movies : favorites
  if (active === "favorites"  && favorites.length === 0) {
    return <p>No Favorites in the list :(</p>;
  }
  if (active === "search" && !isSearching) {
    return <p>No results :(</p>;
  }    
  return results.map(result => {
    return <Result toggleFavorite={toggleFavorite} result={result}/>;
  });
};
export { Links, Results, SearchForm };
