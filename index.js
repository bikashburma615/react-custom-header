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
