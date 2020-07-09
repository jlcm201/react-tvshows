import React from 'react';
import { Button } from 'react-bootstrap';
import { actionObject } from '../store';
import { connect } from 'react-redux';

const Favorites = ( { showFavorites, setShowFavorites } ) => {
  
    const exeShowFavorites = () => {
        actionObject.SHOWFAVORITES.show = !showFavorites;
        setShowFavorites();
    };
  
    return (
      <div className='col-sm-4 offset-sm-4' 
           style = {{ marginBottom: '0.5em' }}>
        <Button variant="primary"
                onClick = { exeShowFavorites }
                size = 'lg'
                block>
            { showFavorites ? 'View All' : 'View Favorites' }
        </Button>
      </div>
    );
  };

const mapStateToProps = (state) => {
    return state;
}; 
const mapDispatchToProps = (dispatch) => {
    return {
      setShowFavorites: () => dispatch(actionObject.SHOWFAVORITES)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Favorites);
