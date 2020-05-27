import React from 'react';

const Header = props => {  
      <div className="header">
        <div className="container header__container">
          <div className="header__left">
            <div className="logo">
              <a href="/" title="Leapfrog Technology">
                <img alt="Leapfrog Technology" />
              </a>
            </div>
            <ul>
              <li className="header__nav-item">
                <a className="header__nav-item-link">
                  Projects
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-item-link">
                  Timesheet
                </a>
              </li>
              <li className="header__nav-item">
                <a className="header__nav-item-link">
                  Leave
                </a>
              </li>
              <li className="header__nav-item">
                <a
                  className="header__nav-item-link header__nav-item-link--active"
                >
                  R&R
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
  };

  export default Header;
