import React, { Component } from "react";

export default class NavLink extends Component {
  constructor(props) {
    super(props);

    const navClass = "nav-link";
    const filterClass = "filter-link";
    const finalClasses = props.finalClasses ? " " + props.finalClasses : "";

    this.state = {
      navClass,
      filterClass,
      classes: `${navClass} ${props.classes} ${filterClass}${finalClasses}`,
    };
  }
  handle = (e) => {
    e.preventDefault();

    this.setState((state, props) => ({
      classes: `${state.navClass} ${props.classes} ${state.filterClass}${
        props.finalClasses ? " " + props.finalClasses : ""
      }`,
    }));
    this.props.clickHandle();
  };
  render() {
    return (
      <a className={this.state.classes} onClick={this.handle} href="">
        {this.props.children}
      </a>
    );
  }
}
