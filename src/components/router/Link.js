import React, {Component} from 'react';

export class Link extends Component {
  // want to consume React context in this component (available at this.context,
  // assuming some ancestor has set up an object for this)
  // notice the (static) property initializer syntax
  // this not only provides a visual contract for what context we should accept
  // but should also ensure that the ancestor passes the right thing (and that
  // they pass it at all, assuming that they do)
  static contextTypes = {
    route: React.PropTypes.string,
    linkHandler: React.PropTypes.func,
  }; // this is all we need to do to consume context


  handleClick = (event) => {
    event.preventDefault(); // want to update browser's address bar and history, but not
    // reload full page

    // HTML5 History API - push router from James K Nelson tutorial
    // TODO: should I just use a hash-based router instead and just preventDefault anyway?
    // (stateObject, pageTitle, location to add to history)
    // this also allows us to use back and forward buttons!
    //history.pushState(null, '', this.props.to);

    this.context.linkHandler(this.props.to);
  }

  // before, we had inserted the "to" property that gets passed in to href,
  // but while this does update the address bar, it does a page refresh also,
  // so need to block that manually via onClick
  // notice that we automatically just take in the link text via the .children
  // property, which is just whatever the component making this Link
  // component passed in as a JSX/HTML child value
  render() {
    const activeClass = this.context.route === this.props.to ? 'active' : '';
    return (
      <a href="#" className={activeClass} onClick={this.handleClick}>{this.props.children}</a>
    );
  }
}

Link.propTypes = {
  to: React.PropTypes.string.isRequired,
};

// remember: this is a class declaration here, not an expression, so you
// don't need a semicolon - export is just a keyword/tag on top of what you
// are already declaring! (see Exploring ES6/ES7 on 2ality)
