(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{67:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(32);const{Vec2:l}=r.b,{random:i,floor:c,min:s,PI:f}=Math,u=2*f,d=["ff0000","00ff00","0000ff","ffff00","00ffff","ff00ff"];t.default=()=>{const e=Object(a.useRef)(),[t,n]=Object(a.useState)(4),[r,f]=Object(a.useState)(4),[m,h]=Object(a.useState)(!0);return Object(a.useEffect)(()=>{const n=e.current,a=n.getContext("2d"),{width:o,height:f}=n,h=(({cols:e,rows:t})=>new Array(e*t).fill().map((n,a)=>{const o=a%e/e+i()/e,r=c(a/e)/t+i()/t;return l({x:o,y:r})}))({cols:t,rows:r}).map((e,t)=>{const n=d[t%d.length];return e.x*=o,e.y*=f,e.c={r:parseInt(n.slice(0,2),16),g:parseInt(n.slice(2,4),16),b:parseInt(n.slice(4,6),16)},e}),p=({x:e,y:n})=>{const a=c(e/o*t)+c(n/f*r)*t;return[h[a-t-1],h[a-t+0],h[a-t+1],h[a-1],h[a+0],h[a+1],h[a+t-1],h[a+t+0],h[a+t+1]].filter(e=>e)},g=a.createImageData(o,f),b=g.data,v=b.length,w=[];let y=0;for(let e=0;e<v;e+=4){const t=e/4,n=l({x:t%o,y:c(t/o)}),a=s(p(n).reduce((e,t)=>{const a=t.dist(n);return a<e?a:e},1/0));a>y&&(y=a),w.push(a)}if(w.forEach((e,t)=>{const n=4*t,a=c(e/y*255);b[n+0]=a,b[n+1]=a,b[n+2]=a,b[n+3]=255}),a.beginPath(),m){for(let e=1;e<r;e++){const t=f/r*e;a.moveTo(0,t),a.lineTo(o,t)}for(let e=1;e<t;e++){const n=o/t*e;a.moveTo(n,0),a.lineTo(n,f)}}h.forEach(e=>{a.moveTo(e.x+2,e.y),a.arc(e.x,e.y,2,0,u)}),a.fillStyle="#ff0000",a.strokeStyle="#ff0000",a.putImageData(g,0,0),a.fill(),a.stroke()},[t,r,m]),o.a.createElement("div",null,o.a.createElement("canvas",{ref:e,width:window.innerWidth,height:window.innerHeight,style:{background:"#ddd"}}),o.a.createElement("div",{style:{position:"absolute",right:"0",top:"0",display:"flex",flexDirection:"column",padding:"5px"}},o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"voronoiX"},"Voronoi X: "),o.a.createElement("input",{id:"voronoiX",type:"number",onChange:({target:{value:e}})=>n(parseInt(e)||1),value:t,min:1,max:50})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"voronoiY"},"Voronoi Y: "),o.a.createElement("input",{id:"voronoiY",type:"number",onChange:({target:{value:e}})=>f(parseInt(e)||1),value:r,min:1,max:50})),o.a.createElement("div",null,o.a.createElement("label",{htmlFor:"grid"},"Show grid"),o.a.createElement("input",{id:"grid",type:"checkbox",onChange:({target:{checked:e}})=>h(e),checked:m,min:1,max:50}))))}}}]);