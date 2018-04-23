import axios from 'axios';


const parser = (images, location) => images.map(src => {
  const container = document.createElement('div');
  container.className = 'imagecontainer';
  const image = document.createElement('img');
  image.className = 'image';
  container.appendChild(image);
  image.src = `${location}data/${src}`;
  return container;
});


axios.defaults.baseURL = `${window.location.origin}/api`;

axios.get('/images')
  .then(res => {
    const images = res.data;
    const root = document.getElementById('root');
    parser(images, window.location).forEach(element => {
      root.appendChild(element);
    });
  })
  .catch(err => {
    console.log(err);
  });