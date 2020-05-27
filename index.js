import React from 'react';

const Header = props => {  
    return (
      <header className="header">
        <div className="container header__container">
          <div className="header__left">
            <div className="logo">
              <a href="/" title="Leapfrog Technology">
                <img alt="Leapfrog Technology" />
              </a>
            </div>
            <ul className={classnames('header__nav', { show: true })}>
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
      </header>
    );
  };

  export default Header;
