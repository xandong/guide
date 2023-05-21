import React from "react";

const Sidebar: React.FC = () => {
  return (
    <React.Fragment>
      <nav>
        <ul>
          <li>Back</li>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Sidebar;
