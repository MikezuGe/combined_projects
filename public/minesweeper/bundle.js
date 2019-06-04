!function(e){var t={};function n(i){if(t[i])return t[i].exports;var l=t[i]={i:i,l:!1,exports:{}};return e[i].call(l.exports,l,l.exports,n),l.l=!0,l.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var l in e)n.d(i,l,function(t){return e[t]}.bind(null,l));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/",n(n.s=74)}({74:function(e,t,n){"use strict";n.r(t);let i=null;var l=class{constructor({containerElement:e,width:t,height:n,mineCount:i,resetButton:l}){this.width=t,this.height=n,this.mineCount=i,this.cells=[],this.playing=!1,this.gameOver=!1,this.cellsOpened=0,this.cellsOpenToWin=t*n-i,this.resetButton=l,this.containerElement=e,this.createField({containerElement:e,width:t,height:n})}createField({containerElement:e,width:t,height:n}){const i=document.createElement("table");i.style.borderCollapse="collapse",this.resetButton.style.zIndex=1020;for(let e=0;e<n;e++){const n=document.createElement("tr"),l=[];for(let i=0;i<t;i++){const t=document.createElement("td");t.addEventListener("mouseup",t=>{t.preventDefault(),t.stopPropagation(),this.playing?this.clickCell({x:i,y:e,e:t}):(this.startGame(),this.insertMines({clickedX:i,clickedY:e}),this.clickCell({x:i,y:e,e:t}))}),t.style.border="1px solid #000",t.style.width="30px",t.style.height="30px",t.style.textAlign="center",t.style.verticalAlign="middle",t.innerHTML='<i class="fas fa-square"></i>',l.push({element:t,content:{isOpen:!1,hasMine:!1,hasFlag:!1,threat:0}}),n.append(t)}this.cells.push(l),i.append(n)}e.append(i)}clickCell({e:e,x:t,y:n}){this.gameOver&&this.resetButton.click();const i=this.cells[n][t];2===e.button?i.content.hasFlag?(i.element.innerHTML='<i class="fas fa-square"></i>',i.content.hasFlag=!1):(i.element.innerHTML='<i class="far fa-flag"></i>',i.content.hasFlag=!0):i.content.hasMine?this.endGame():!i.content.isOpen&&this.openCells({x:t,y:n}),this.checkIfVictory()}checkIfVictory(){this.cellsOpened===this.cellsOpenToWin&&this.winGame()}openCells({x:e,y:t}){const n=this.cells;for(let i=-1;i<=1;i++)for(let l=-1;l<=1;l++){const a=e+l,s=t+i,o=n[s]&&n[s][a];!o||o.content.isOpen||o.content.hasMine||(this.cellsOpened++,o.content.isOpen=!0,o.element.innerHTML=o.content.threat?o.content.threat:((i||l)&&this.openCells({x:a,y:s}),""))}}insertMines({clickedX:e,clickedY:t}){const{floor:n,random:i}=Math,{height:l,width:a,mineCount:s,cells:o}=this;for(let r=s;r--;){const s=()=>n(i()*l),r=()=>n(i()*a);let c=null;do{const n=s(),i=r();t===n&&e===i||(c=o[n][i])}while(!c||c.content.hasMine);c.content.hasMine=!0}this.setThreats()}setThreats(){const e=this.cells;e.forEach((t,n)=>{t.forEach((t,i)=>{for(let l=-1;l<=1;l++)for(let a=-1;a<=1;a++){if(!l&&!a)continue;const s=i+a,o=n+l,r=e[o]&&e[o][s];r&&r.content.hasMine&&t.content.threat++}})})}startGame(){this.playing=!0}endGame(){this.cells.flat().forEach(function(e){e.element.innerHTML=e.content.hasMine?'<i class="fas fa-bomb"></i>':e.content.threat?e.content.threat:""}),this.playing=!1,this.gameOver=!0}winGame(){this.endGame();const{random:e}=Math;!function t(){let n=document.getElementById("winContainer");n||((n=document.createElement("div")).id="winContainer",n.style.width="100vw",n.style.height="100vh",document.body.append(n)),i=setTimeout(t,100+(100*e()|0));let l=document.createElement("div");l.innerHTML="🏆",l.style.position="absolute",l.style.zIndex=1010,l.style.fontSize=16+(48*e()|0)+"px",l.style.left=(e()*innerWidth|0)+"px",l.style.top=(e()*(innerHeight+pageYOffset)|0)+"px",n.append(l)}(),alert("Voitit pelin")}destroy(){for(;this.containerElement.lastChild;)this.containerElement.removeChild(this.containerElement.lastChild);const e=document.getElementById("winContainer");e&&(clearTimeout(i),e.remove())}};const a=document.getElementById("root");a.style.margin="0 auto",a.style.maxWidth="500px",a.style.width="100%";const s=document.createElement("div"),o=document.createElement("div");a.append(o),a.append(s);const r=document.createElement("button");r.innerText="Reset",o.append(r);const c={containerElement:s,width:8,height:8,mineCount:10,resetButton:r},h=document.createElement("div"),d=document.createElement("label");d.htmlFor="minesInput",d.innerText="Mines: ",h.append(d);const u=document.createElement("input");u.id="minesInput",u.type="number",u.max=c.width*c.height-1,u.min=1,u.step=1,u.value=c.mineCount,u.addEventListener("change",({target:{value:e}})=>{c.mineCount=parseInt(e)}),h.append(u);const m=document.createElement("div"),p=document.createElement("label");p.htmlFor="widthInput",p.innerText="Width: ",m.append(p);const f=document.createElement("input");f.id="widthInput",f.type="number",f.max=10,f.min=3,u.step=1,f.value=c.width,f.addEventListener("change",({target:{value:e}})=>{c.width=parseInt(e),u.max=c.width*c.height-1,parseInt(u.value)>=u.max&&(u.value=u.max,c.mineCount=u.max)}),m.append(f);const y=document.createElement("div"),g=document.createElement("label");g.htmlFor="heightInput",g.innerText="Heigh: ",y.append(g);const v=document.createElement("input");v.id="heightInput",v.type="number",v.max=10,v.min=3,u.step=1,v.value=c.height,v.addEventListener("change",({target:{value:e}})=>{c.height=parseInt(e),u.max=c.width*c.height-1,parseInt(u.value)>=u.max&&(u.value=u.max,c.mineCount=u.max)}),y.append(v),o.append(h),o.append(m),o.append(y);let x=new l(c);r.addEventListener("click",()=>{x.destroy(),x=new l(c)}),document.addEventListener("contextmenu",e=>e.preventDefault())}});