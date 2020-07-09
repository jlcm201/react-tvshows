import React from 'react';
import { Modal, Card } from 'react-bootstrap';
import { actionObject } from '../store';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser'; 

const Details = ( { tvShowActual, lstFavorites, showModalDetails, showDetail, addFavorite, removeFavorite } ) => {
  
  const handleClose = () => { 
    actionObject.SHOWMODALDETAILS.showModal = false;
    showDetail();
  }

  const funcIsFavorite = (idShow) => {
    return lstFavorites.indexOf(idShow) >= 0;
  };

  const turnFavorite = (e) => {
    e.preventDefault();
    const idTvshow = tvShowActual.id;
    const favorite = !funcIsFavorite(idTvshow);

    if(favorite) {
        actionObject.ADDFAVORITE.idTvshow = idTvshow;
        addFavorite();
    }
    else {
        actionObject.REMOVEFAVORITE.idTvshow = idTvshow;
        removeFavorite();
    } 
  };

  return !tvShowActual ? '' : (
    <>
      <Modal
        show = { showModalDetails }
        onHide = { handleClose }
        backdrop = "static"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>{ tvShowActual.name }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card style = {{ width: '29.2rem' }}
              bg = "dark"
              text = "white">
          <Card.Link className="w-100" 
                      style={{ textAlign: 'center', color: 'white' }}
                      href="#" 
                      onClick = { turnFavorite }>
            { funcIsFavorite(tvShowActual.id) ? 'Remove Favorites' : 'Add Favorites' }</Card.Link>
          <Card.Img 
            variant="top" 
            src={ tvShowActual.image.original }  
            style={{ width: '29.1rem', height: '29rem' }}/>
          <Card.Body>
            <Card.Text>{ ReactHtmlParser(tvShowActual.summary) }</Card.Text>
          </Card.Body>
          { tvShowActual.externals.imdb === undefined || tvShowActual.externals.imdb === '' ? <></> : 
            <Card.Link className = "w-100" 
                        style = {{ textAlign: 'center', color: 'white' }}
                        target = "_blank"
                        href = { 'https://www.imdb.com/title/' + tvShowActual.externals.imdb } >
              View IMDB</Card.Link>
          }
        </Card>
        </Modal.Body>
      </Modal>
    </>
  );
  };

const mapStateToProps = (state) => {
    return state;
}; 
const mapDispatchToProps = (dispatch) => {
    return {
      addFavorite: () => dispatch(actionObject.ADDFAVORITE),
      removeFavorite: () => dispatch(actionObject.REMOVEFAVORITE),
      showDetail: () => dispatch(actionObject.SHOWMODALDETAILS)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Details);
