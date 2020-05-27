import React from 'react';

const toJSXEvent = (name) => `on${name.split('-').map(x => x[0].toUpperCase() + x.slice(1)).join('')}`;

export default (wrapped, events) => class Wrapper extends React.PureComponent {
    constructor(props) {
        super(props);

        this._elRef = React.createRef();
        this._attachedEvents = [];
    }

    connectAttributes() {
        const curr = this._elRef && this._elRef.current;
        const attrs = Object.entries(this.props).filter(([key]) => key !== 'children' && key !== 'className');

        for (const [key, value] of attrs) {
            curr[key] = value;
        }
    }

    connectEvents() {
        const curr = this._elRef && this._elRef.current;

        this._attachedEvents = events.map((name) => {
            const jsxName = toJSXEvent(name);
            const handler = this.props[jsxName];
 
            if (handler) {
                curr.addEventListener(name, handler);
            }
 
            return { name, handler };
        });
    }

    disconnectEvents() {
        const curr = this._elRef && this._elRef.current;

        for (const {name, handler} of this._attachedEvents) {
            curr.removeEventListener(name, handler);
        }
    }

    componentDidMount() {
        this.disconnectEvents();
        this.connectAttributes();
        this.connectEvents();
    }

    componentDidUpdate() {
        this.disconnectEvents();
        this.connectAttributes();
        this.connectEvents();
    }

    componentWillUnmount() {
        this.disconnectEvents();
    }

    render() {
        const el = React.createElement(wrapped, {
            ref: this._elRef,
            children: this.props.children,
            class: this.props.className,
        });

        return el;
    }
}

export default Header = props => {
    const [isUserMenuShown, setIsUserMenuShown] = useState(false);
    const [isMenuShown, setIsMenuShown] = useState(false);
  
    const toggleMenu = param => {
      if (param === 'user') {
        setIsUserMenuShown(!isUserMenuShown);
      } else {
        setIsMenuShown(!isMenuShown);
      }
    };
  
    const { user } = props;
  
    return (
      <header className="header">
        <div className="container header__container">
          <div className="header__left">
            <div className="logo">
              <a href="/" title="Leapfrog Technology">
                <img src={logoFull} alt="Leapfrog Technology" />
              </a>
            </div>
            <ul className={classnames('header__nav', { show: isMenuShown })}>
              <li className="header__nav-item">
                <a href={config.uri.vyaguta.projects} className="header__nav-item-link">
                  Projects
                </a>
              </li>
              <li className="header__nav-item">
                <a href={config.uri.vyaguta.timesheet} className="header__nav-item-link">
                  Timesheet
                </a>
              </li>
              <li className="header__nav-item">
                <a href={config.uri.vyaguta.leave} className="header__nav-item-link">
                  Leave
                </a>
              </li>
              <li className="header__nav-item">
                <a
                  href={config.uri.vyaguta.rnr}
                  className="header__nav-item-link header__nav-item-link--active"
                >
                  R&R
                </a>
              </li>
            </ul>
          </div>
          <div className="header__right">
            <div className="header__right-profile" onClick={() => toggleMenu('user')}>
              <UserProfile
                profileImage={user.avatarUrl}
                profileName={`${user.firstName || ''} ${user.lastName || ''}`}
              />
              <FiChevronDown className="dropdown-icon" size="18px" />
            </div>
            <ul className={classnames('dropmenu', { show: isUserMenuShown })}>
              <li className="dropmenu__node">
                <a href={getUserProfileUrl(user)} title={user.name} className="dropmenu__node-link">
                  View Profile
                </a>
              </li>
              <li className="dropmenu__node">
                <a
                  href={`${config.authURI}${config.lmsEndpoints.auth.logout}`}
                  title="Logout"
                  className="dropmenu__node-link"
                >
                  Log Out
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
    );
  };
  