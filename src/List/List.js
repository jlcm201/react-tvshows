import React from 'react';
import { connect } from 'react-redux';
import { actionObject } from "../store";

import Title from '../inputs/title';
import NotFavorite from '../inputs/notFavorite';
import Details from '../inputs/details'

const List = ({ tvshows, lstFavorites, showFavorites, filterTvShows, addFavorite, showModalNotFavorite, showModalDetails }) => {
    
    const funcIsFavorite = (idShow) => {
        return lstFavorites.indexOf(idShow) >= 0;
    };

    const turnFavorite = (idTvshow, favorite) => {
        
        if(favorite) {
            actionObject.ADDFAVORITE.idTvshow = idTvshow;
            addFavorite();
        }
        else {
            actionObject.SHOWMODALNOTFAVORITE.showModal = true;
            actionObject.SHOWMODALNOTFAVORITE.tvShow = tvshows.filter((element) => element.id === idTvshow)[0];
            actionObject.REMOVEFAVORITE.idTvshow = idTvshow;
            showModalNotFavorite();
        }
    };

    const showDetails = (idTvshow) => {
        actionObject.SHOWMODALDETAILS.showModal = true;
        actionObject.SHOWMODALDETAILS.tvShow = tvshows.filter((element) => element.id === idTvshow)[0];
        showModalDetails();
    };

    const containsFilter = (tvshow) => {
        return filterTvShows === '' || 
              (filterTvShows !== '' && 
                    (tvshow.name.toLowerCase().includes(filterTvShows.toLowerCase()) || 
                     tvshow.summary.toLowerCase().includes(filterTvShows.toLowerCase())))
    };

    return (
        <>
            <div className = 'App col-sm-10 offset-sm-1 d-flex flex-column'>
                <div className="app-div">
                    { tvshows.map(tvshow => ( (!showFavorites || (showFavorites && funcIsFavorite(tvshow.id))) && (
                    containsFilter(tvshow)) && (
                        <Title 
                        tvshow = { tvshow } 
                        isFavorite = { funcIsFavorite(tvshow.id) }
                        onFavorite = { turnFavorite }
                        onDetails = { showDetails }
                        key = { tvshow.id }/>
                    )))}
                    { tvshows.filter(tvshow => ( (!showFavorites || (showFavorites && funcIsFavorite(tvshow.id))) && (
                    containsFilter(tvshow)))).length === 0 && <h1>No Results Found!</h1>}
                </div>
            </div>
            <NotFavorite />
            <Details />
      </>
    );
};

const mapStateToProps = (state) => {
    return state;
}; 

const mapDispatchToProps = (dispatch) => {
    return {
        addFavorite: () => dispatch(actionObject.ADDFAVORITE),
        showModalNotFavorite: () => dispatch(actionObject.SHOWMODALNOTFAVORITE),
        showModalDetails: () => dispatch(actionObject.SHOWMODALDETAILS)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List);
