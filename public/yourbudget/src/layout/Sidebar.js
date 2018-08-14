import React from 'react';
import { Link, } from 'react-router-dom';


const styles = {
  sidebar: {
    gridArea: 'sidebar',
    background: 'green',
    display: 'flex',
    flexDirection: 'column',
  },
};


class Sidebar extends React.Component {

  render () {
    return (
      <div style={styles.sidebar}>
        <Link to='/home'>Home</Link>
        <Link to='/budget'>Budget</Link>
        <Link to='/settings'>Settings</Link>
      </div>
    )
  }

}


export default Sidebar;
