import React, { Component, Fragment } from "react";

export default class PageItem extends Component {
  constructor(props) {
    super(props);
  }
  handle = e => {
    e.preventDefault();
    this.props.clickHandle();
  };
  render = () => pug`
    li.page-item(className=this.props.classes)
      //- a.page-link(href="" class={"ml-6": index == count - 1})
      a.page-link(href=this.props.link onClick=this.handle)= this.props.children
  `;
}
