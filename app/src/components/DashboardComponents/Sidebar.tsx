import React from 'react';
import '../../stylings/DashboardStyles/sidebar.css';
import { Component } from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends Component {
  render() {
    return (
      <div className="sidebar-div">
        <ul>
          <button className="sidebar-button">Home</button>
          <Link to="/Timeline">
            <button className="sidebar-button">
              Timeline (Under Construction)
            </button>
          </Link>
          <button className="sidebar-button">
            Table (Under Construction){' '}
          </button>
          <button className="sidebar-button">
            Settings (Under Construction)
          </button>
        </ul>
      </div>
    );
  }
}
export default Sidebar;
