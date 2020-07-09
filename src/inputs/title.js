import React from 'react';
import Marker from './marker'
import styles from './title.module.css';

const Title = ({ tvshow, isFavorite, onFavorite, onDetails }) => {
    const clasesImage = 'img-thumbnail ' + styles.image;
    const clasesContainer = 'title d-sm-flex flex-row ' + styles.underline;

    const handlerFavorite = (idTvshow, favorite) => {
        onFavorite(idTvshow, favorite);
    };

    const handlerDetails = () => {
        onDetails(tvshow.id);
    };

    return(
        <div className = { clasesContainer }
            value = { tvshow.id }
            onClick = { handlerDetails }>
            <img src = { tvshow.image.medium } alt = { tvshow.name } className = { clasesImage }></img>
            <span className = { styles.titleName }>
                { tvshow.name }
            </span>
            <Marker isEnabled = { isFavorite } idTvshow = { tvshow.id } onFavorite = { handlerFavorite } />
        </div>
    );
};

export default Title;