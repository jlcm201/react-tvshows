import React, { useRef } from 'react';
import styles from './marker.module.css';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Marker = ({ isEnabled, idTvshow, onFavorite }) => {
    const clases = 'markerCircle ' + styles.circle + ' ' +  (isEnabled === true ? styles.enabled  : styles.disabled);
    const refMarker = useRef();

    const clickFavorite = (e) => {
        e.stopPropagation();
        onFavorite(idTvshow, !isEnabled);
    };

    return(
        <div className={ styles.contenedor + ' ml-auto' }>
            <OverlayTrigger
                key={'tt' + idTvshow}
                placement={ 'top' }
                overlay={
                <Tooltip id={`tooltip-${'tt' + idTvshow}`}>
                    { isEnabled ? 'Remove from ' : 'Add to ' } Favorites...
                </Tooltip>
                }>
                <div value = { isEnabled } 
                    className = { clases }
                    onClick = { clickFavorite }
                    ref = { refMarker }>
                </div>
            </OverlayTrigger>
        </div>
    );
};

export default Marker;