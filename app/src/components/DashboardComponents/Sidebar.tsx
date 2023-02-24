import React from 'react';
import '../../stylings/DashboardStyles/sidebar.css';

function Sidebar() {
  return (
    <div className="sidebar-div">
      <ul>
        <button className="sidebar-button">Home</button>
        <button className="sidebar-button">Timeline</button>
        <button className="sidebar-button">Table</button>
        <button className="sidebar-button">Settings</button>
      </ul>
    </div>
  );
}

export default Sidebar;
