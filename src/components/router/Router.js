// this component is to help handle the state of where our current location
// is in the browser and allow other components to see it - whenever we click
// on items in some of the links in the footer, we change where we are in
// the browser, but we need other components to be aware of this context
// the Footer responds to clicks to update the history/URL; if we didn't have
// this Router component, then other components would need to do querying to
// check where we are

import React, {Component} from 'react'; // notice the default import here and then named import combined on same line

const getCurrentPath = () => {
  const path = document.location.pathname; // interesting that this property is on the document as well as window

  return path.substring(path.lastIndexOf('/'));
};

export class Router extends Component {
  // property initializer syntax (same thing as what we have when we do the
  // fn = () => {...} vs. method declaration syntax of fn() {...}, the former
  // of which binds to this)
  state = {
    route: getCurrentPath(), // set where the initial path is whenever this component gets rendered
  } // this.state = ...

  handleLinkClick = (route) => {
    this.setState({
      route
    });
    history.pushState(null, '', route); // handle update to browser history
  };

  // React context mechanism
  // notice the (static) property initializer syntax here
  // like propTypes but for the this.context object that descendent components
  // can read
  static childContextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func,
  }

  // looks like child/descendent components can access this object via this.context,
  // where since the parent/ancestor component is set up and rendered first, this object
  // will have been created, and then later child components during the initialization and
  // render cycle can just view this at this.context property
  getChildContext() {
    return {
      route: this.state.route,
      linkHandler: this.handleLinkClick,
    };
  }

  // essentially just a passthrough for just rendering whatever it wraps (in this case,
  // it is our full application: whenever a link is clicked that updates the URL/location
  // state of our app, we want all components to be able to access this/query the location,
  // so we need to make the location state available as high as possible to provide to
  // our lower components (push state up, as part of React philosophy), and so Router is
  // higher-level than App such that all components, App and under, can access this);
  // along the same lines, any link click that updates the URL/location will have the above
  // handleLinkClick callback to call
  // now, careful how you pass this down: passing down a callback like this could involve
  // passing it down many component levels (here, we already have Router -> App -> Footer),
  // which increases maintenance; also, since we are just passing through any generic component(s)
  // via this.props.children, how would we pass it to them in the first place?
  // will use the context mechanism instead
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

// again: remember that this is a class declaration, since export is just a
// leading keyword and not a function or anything like that, so we don't need
// the semicolon here
