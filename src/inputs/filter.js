import React, { createRef } from 'react';
import { Form } from 'react-bootstrap';
import { actionObject } from '../store';
import { connect } from 'react-redux';

const Filter = ( { setfilterTvShows } ) => {
    const txt = createRef();
  
    const exefilterTvShows = () => {
        console.log(txt.target);
        actionObject.FILTERTVSHOWS.filter = txt.current.value;
        setfilterTvShows();
    };
  
    return (
      <Form className='col-sm-4 offset-sm-4' 
           style = {{ marginBottom: '0.5em' }}>
        <Form.Control type="text" 
                      placeholder="Type to Filter..."
                      onChange = { exefilterTvShows } 
                      ref = { txt }
                      size = 'sm' />
      </Form>
    );
  };

const mapStateToProps = (state) => {
    return state;
}; 
const mapDispatchToProps = (dispatch) => {
    return {
      setfilterTvShows: () => dispatch(actionObject.FILTERTVSHOWS)
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Filter);
