import React from 'react';


const styles = {
  head: {
    gridArea: 'header',
    background: 'red',
  },
};


class Header extends React.Component {

  render () {
    return (
      <div style={styles.head}>
      </div>
    )
  }

}


export default Header;
