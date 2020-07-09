import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import List from "./List/List";
import store from './store';
import './App.css';
import Favorites from './inputs/favorites';
import Filter from './inputs/filter';


function App() {
  const [ tvshows, setTvshows ] = useState([]);
  const [ isFetching, setFetching ] = useState(true);



  useEffect(() => {
    fetch('https://api.tvmaze.com/shows')
      .then(res => res.json())
      .then(tvshows => {
        setTvshows(tvshows);
        setFetching(false);
      });
    
  }, []);


  return (
    <Provider store={store}>
      { isFetching && <div><div className="spinner-border text-dark spinning"></div></div> }
      { !isFetching && 
        <>
          <Filter />
          <Favorites />
          <List tvshows = { tvshows } />
        </>
      }
    </Provider>
  );
}

export default App;
