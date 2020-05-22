import React, { Component } from "react";

export default class NavLink extends Component {
  constructor(props) {
    super(props);

    const filterClass = "filter-link";
    const finalClasses = props.finalClasses ? " " + props.finalClasses : "";

    this.state = {
      filterClass,
      classes: `${props.classes} ${filterClass}${finalClasses}`
    };
  }
  handle = e => {
    e.preventDefault();

    this.setState((state, props) => ({
      classes: `${props.classes} ${state.filterClass}${
        props.finalClasses ? " " + props.finalClasses : ""
      }`
    }));
    this.props.clickHandle();
  };
  render() {
    return pug`
      a.nav-link(className=this.state.classes onClick=this.handle href="")= this.props.children
    `;
  }
}
