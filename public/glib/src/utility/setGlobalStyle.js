const setGlobalStyle = css => {
  const style = document.createElement('style');
  style.type = 'text/css';
  (document.head || document.getElementsByTagName('head')[0]).appendChild(style);
  if (!css) {
    css = `
    * {
      font-family: 'Ubuntu', sans-serif;
      margin: 0;
      padding: 0;
      box-sizing: border-box;
      font-size: 16px;
    }
    
    html body {
      height: 100vh;
      width: 100vw;
      overflow: hidden;
    }
    
    #root {
      width: 100%;
      height: 100%;
    }
    
    canvas {
      //width: 100%;
      //height: 100%;
      background: gray;
    }
    `;
  }
  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}


export default setGlobalStyle;
