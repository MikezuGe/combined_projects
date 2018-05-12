import React, { Component, } from 'react';
import PropTypes from 'prop-types';


class Modal extends Component {

    render () {
        return <div>
            <div>{this.props.message}</div>
        </div>
    }

}


Modal.propTypes = {
    message: PropTypes.string.isRequired,
};



export default Modal;
