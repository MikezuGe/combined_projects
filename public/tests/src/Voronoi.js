import React, { useState, useEffect, useRef, } from 'react';
import { math, } from '@components/utility';
const { Vec2, } = math;


const {
  random,
  floor,
  min,
  PI,
} = Math;

const radius = 2;
const fullCircle = PI * 2;

const colors = [
  'ff0000',
  '00ff00',
  '0000ff',
  'ffff00',
  '00ffff',
  'ff00ff',
];

const VoronoiPoints = ({ cols, rows, }) => new Array(cols * rows).fill().map((undefined, i) => {
  const x = i % cols / cols + random() / cols;
  const y = floor(i / cols) / rows + random() / rows;
  return Vec2({
    x,
    y,
  });
});


const Voronoi = () => {
  const canvasRef = useRef();
  const [ voronoiX, setVoronoiX, ] = useState(4);
  const [ voronoiY, setVoronoiY, ] = useState(4);
  const [ grid, setGrid, ] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const { width, height, } = canvas;

    const voronoiPoints = VoronoiPoints({
      cols: voronoiX,
      rows: voronoiY,
    }).map((p, i) => {
      const color = colors[i % colors.length];
      p.x *= width;
      p.y *= height;
      p.c = {
        r: parseInt(color.slice(0, 2), 16),
        g: parseInt(color.slice(2, 4), 16),
        b: parseInt(color.slice(4, 6), 16),
      };
      return p;
    });

    const getTileAndSurroundingTiles = ({ x, y, }) => {
      const pos = floor(x / width * voronoiX) + floor(y / height * voronoiY) * voronoiX;
      return [
        voronoiPoints[pos - voronoiX - 1],
        voronoiPoints[pos - voronoiX + 0],
        voronoiPoints[pos - voronoiX + 1],
        voronoiPoints[pos - 1],
        voronoiPoints[pos + 0],
        voronoiPoints[pos + 1],
        voronoiPoints[pos + voronoiX - 1],
        voronoiPoints[pos + voronoiX + 0],
        voronoiPoints[pos + voronoiX + 1],
      ].filter(p => p);
    };

    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    const dl = data.length;
    /*
    // Color around voronoi points
    for (let i = 0; i < dl; i+=4) {
      const ii = i / 4;
      const pixel = Vec2({
        x: ii % width,
        y: floor(ii / width),
      });
      let closestDist = null;
      let closestPoint = null;
      getTileAndSurroundingTiles(pixel).forEach(point => {
        const dist = point.dist(pixel);
        if (!closestDist || closestDist > dist) {
          closestDist = dist;
          closestPoint = point;
        }
      });

      data[i + 0] = closestPoint.c.r;
      data[i + 1] = closestPoint.c.g;
      data[i + 2] = closestPoint.c.b;
      data[i + 3] = 255;
    }
    */

    // Hue around voronoipoints
    const pixelDistances = [];
    let longestDistance = 0;
    for (let i = 0; i < dl; i+=4) {
      const ii = i / 4;
      const pixel = Vec2({
        x: ii % width,
        y: floor(ii / width),
      });
      const dist = min(getTileAndSurroundingTiles(pixel).reduce((shortest, point) => {
        const dist = point.dist(pixel);
        return dist < shortest ? dist : shortest;
      }, Infinity));
      dist > longestDistance && (longestDistance = dist);
      pixelDistances.push(dist);
    }
    pixelDistances.forEach((pd, i) => {
      const ii = i * 4;
      const hue = floor(pd / longestDistance * 255);
      data[ii + 0] = hue;
      data[ii + 1] = hue;
      data[ii + 2] = hue;
      data[ii + 3] = 255;
    });
    
    // Draw grid and voronoi points
    ctx.beginPath();
    // Grid
    if (grid) {
      for(let i = 1; i < voronoiY; i++) {
        const y = height / voronoiY * i;
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      for(let i = 1; i < voronoiX; i++) {
        const x = width / voronoiX * i;
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
    }
    // Voronoipoints
    voronoiPoints.forEach(p => {
      ctx.moveTo(p.x + radius, p.y);
      ctx.arc(p.x, p.y, radius, 0, fullCircle);
    });
    ctx.fillStyle = '#ff0000';
    ctx.strokeStyle = '#ff0000';
    ctx.putImageData(imageData, 0, 0);
    ctx.fill();
    ctx.stroke();

  }, [ voronoiX, voronoiY, grid, ]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={window.innerWidth}
        height={window.innerHeight}
        style={{ background: '#ddd', }}
      />
      <div
        style={{
          position: 'absolute',
          right: '0',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
          padding: '5px',
        }}
      >
        <div>
          <label htmlFor={'voronoiX'}>{'Voronoi X: '}</label>
          <input
            id={'voronoiX'}
            type={'number'}
            onChange={({ target: { value, }, }) => setVoronoiX(parseInt(value) || 1)}
            value={voronoiX}
            min={1}
            max={50}
          />
        </div>
        <div>
          <label htmlFor={'voronoiY'}>{'Voronoi Y: '}</label>
          <input
            id={'voronoiY'}
            type={'number'}
            onChange={({ target: { value, }, }) => setVoronoiY(parseInt(value) || 1)}
            value={voronoiY}
            min={1}
            max={50}
          />
        </div>
        <div>
          <label htmlFor={'grid'}>{'Show grid'}</label>
          <input
            id={'grid'}
            type={'checkbox'}
            onChange={({ target: { checked, }, }) => setGrid(checked)}
            checked={grid}
            min={1}
            max={50}
          />
        </div>
      </div>
    </div>
  );
};


export default Voronoi;
