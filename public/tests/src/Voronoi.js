import React, { useState, useEffect, useRef, } from 'react';


const {
  random,
  floor,
  pow,
} = Math;

const colors = [
  '000000',
  'ff0000',
  '00ff00',
  '0000ff',
  'ffff00',
  '00ffff',
  'ff00ff',
  'ffffff',
];

const distSqrt = ({ x: x1, y: y1, }, { x: x2, y: y2, }) => {
  return pow(x1 - x2, 2) + pow(y1 - y2, 2);
};

const closest = (point, points) => {
  return points.reduce((last, p) => {
    const dist = distSqrt(point, p);
    return !last.dist || dist < last.dist ? { dist, point: p, } : last;
  }, {}).point;
};

const createVoronoiPoints = ({ number, width, height, }) => {
  return new Array(number).fill().map((undefined, i) => ({
    x: floor(random() * width),
    y: floor(random() * height),
    c: {
      r: parseInt(colors[i % 8].slice(0, 2), 16),
      g: parseInt(colors[i % 8].slice(2, 4), 16),
      b: parseInt(colors[i % 8].slice(4, 6), 16),
    },
  }));
};



const Voronoi = () => {
  const canvasRef = useRef();
  const voronoiNumberInput = useRef();
  const [ voronoiPointNumber, setVoronoiPointNumber, ] = useState(6);

  useEffect(() => {
    const numberInput = voronoiNumberInput.current;
    numberInput.disabled = true;

    const canvas = canvasRef.current;
    const voronoiPoints = createVoronoiPoints({
      number: voronoiPointNumber,
      width: canvas.width,
      height: canvas.height,
    });
    canvas.width = 700;
    canvas.height = 700;
    const ctx = canvas.getContext('2d');
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const dl = imageData.data.length;
    const imgdw = imageData.width;

    const t = Date.now();
    for (let i = 0; i < dl; i+=4) {
      const { c: { r, g, b, }, } = closest({ x: i / 4 % imgdw, y: floor(i / 4 / imgdw), }, voronoiPoints);
      imageData.data[i + 0] = r;
      imageData.data[i + 1] = g;
      imageData.data[i + 2] = b;
      imageData.data[i + 3] = 255;
    }
    console.log(`${(Date.now() - t)}ms`);
    
    voronoiPoints.forEach(({ x, y, }) => {
      const coord = (y * imageData.width + x) * 4;
      imageData.data[coord + 0] = 255;
      imageData.data[coord + 1] = 255;
      imageData.data[coord + 2] = 255;
    });
    
    ctx.putImageData(imageData, 0, 0, 0, 0, canvas.width, canvas.height);
    numberInput.disabled = false;
  }, [ voronoiPointNumber, ]);

  return (
    <React.Fragment>
      <canvas ref={canvasRef} />
      <input
        ref={voronoiNumberInput}
        type={'number'}
        onChange={({ target: { value, }, }) => setVoronoiPointNumber(parseInt(value) || 1)}
        max={500}
        disabled
      />
    </React.Fragment>
  );
};
export default Voronoi;
