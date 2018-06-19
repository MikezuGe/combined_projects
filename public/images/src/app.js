import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';

import 'css/style.css';

import Thumbnails from 'js/thumbnails';
import BigImage from 'js/bigimage';
import Modal from 'js/modal';


axios.defaults.baseURL = `${window.location.origin}/api/images`;


class App extends Component {

  state = {
    error: '',
    thumbnailUrls: [],
    imageUrls: [],
    bigImageUrl: '',
  }

  componentDidMount() {
    axios.get('/')
      .then(result => {
        if (result.status !== 200) {
          this.setState({ error: result.data, });
          return;
        }
        const { location, } = window;
        const { thumbnailUrls, bigImageUrls, } = result.data;
        this.setState({
          bigImageUrls: bigImageUrls.map(url => `${location}${url}`),
          thumbnailUrls: thumbnailUrls.map(url => `${location}${url}`),
        });
      })
      .catch(err => {
        this.setState({ error: `${err.response.status}: ${err.response.data}`, });
      });
  }

  openImage = bigImageUrl => {
    this.setState({ bigImageUrl, });
  }

  closeImage = () => {
    this.setState({ bigImageUrl: '', })
  }

  render ()  {
    const { thumbnailUrls, bigImageUrls, bigImageUrl, error, } = this.state;
    const { openImage, closeImage, } = this;
    return <div className={'container'}>
      { error.length > 0 &&
        <Modal message={error} /> }
      { thumbnailUrls.length > 0 && bigImageUrls.length > 0 &&
        <Thumbnails openImage={openImage} thumbnailUrls={thumbnailUrls} bigImageUrls={bigImageUrls} /> }
      { bigImageUrl.length > 0 &&
        <BigImage closeImage={closeImage} bigImageUrl={bigImageUrl} /> }
    </div>
  }

}


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
