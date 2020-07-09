import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { actionObject } from '../store';
import { connect } from 'react-redux';

const NotFavorite = ( { tvShowActual, showModalNoFavorite, removeFavorite, showModalNotFavorite } ) => {
  
    const handleClose = () => { 
      actionObject.SHOWMODALNOTFAVORITE.showModal = false;
      showModalNotFavorite();
    }

    const removeTvShowToFavorites = () => {
      removeFavorite();
      handleClose();
    };
  
    return !tvShowActual ? '' : (
      <>
        <Modal
          show = { showModalNoFavorite }
          onHide = { handleClose }
          backdrop = "static"
          keyboard = { false }
          centered
        >
          <Modal.Header>
            <Modal.Title>TV Shows.</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Do you want remove "<strong> { tvShowActual.name } </strong>" from Favorites?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick = { handleClose }>
            &nbsp;No&nbsp;
            </Button>
            <Button variant="primary"
              onClick = { removeTvShowToFavorites }>
                &nbsp;Yes&nbsp;</Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };

  const mapStateToProps = (state) => {
    return state;
}; 
const mapDispatchToProps = (dispatch) => {
    return {
      removeFavorite: () => dispatch(actionObject.REMOVEFAVORITE),
      showModalNotFavorite: () => dispatch(actionObject.SHOWMODALNOTFAVORITE)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotFavorite);
