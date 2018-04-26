import axios from 'axios';
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import './css/style.css';


axios.defaults.baseURL = `${window.location.origin}/api`;


class App extends Component {

  state = {
    thumbnailUrls: [],
    imageUrls: [],
    displayedImage: '',
  }

  componentDidMount() {
    axios.get('/images')
      .then(result => {
        const { location, } = window;
        const { thumbnailUrls, imageUrls, } = result.data;
        this.setState({
          imageUrls: imageUrls.map(url => `${location}${url}`),
          thumbnailUrls: thumbnailUrls.map(url => `${location}${url}`),
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  openImage = index => {
    console.log(index);
    console.log(this.state.imageUrls[index]);
    this.setState({
      displayedImage: this.state.imageUrls[index],
    });
  }

  closeImage = () => {
    this.setState({
      displayedImage: '',
    })
  }

  render() {
    console.log(this.state);
    return <div className={'container'}>
      { this.state.thumbnailUrls.length > 0 && this.state.thumbnailUrls.map((url, index) => <img className={'image'} key={index} onClick={() => { this.openImage(index) }} src={url} />) }
      { this.state.displayedImage && bigImage(this.state.displayedImage, this.closeImage) }
    </div>
  }

}


const bigImage = (url, close) => <img onClick={close} src={url} />;


ReactDOM.render(
  <App />,
  document.getElementById('root')
);
