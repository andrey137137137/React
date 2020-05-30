import React, { Component } from "react";
import store from "@store";
import SvgCmp from "@cmp/SvgCmp";
import PageItem from "@paginationCmp/PageItem";
import { getComputedClasses } from "@help/classes";

const { count, current } = store.pagination;

const PageIcon = props => (
  // span.icon.page-text.page-icon(class="icon-" + icon)
  <SvgCmp
    icon="angle"
    classes={"icon icon-" + props.icon + " page-text page-icon"}
  />
);

const PageText = props => (
  <span className="d-none d-md-block page-text"> {props.value} </span>
);

export default class PageArrow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prevIndex: current - 2,
      nextIndex: current + 2,
      lastIndex: count - 1
    };
  }

  getItemClasses = (index, hiddenClasses = false) => {
    return getComputedClasses([{ cond: index == current, value: "active" }]);
  };
  prevHandle = () => {
    store.pagination.current = this.state.prevIndex;
  };
  firstHandle = () => {
    store.pagination.current = 0;
  };
  nextHandle = () => {
    store.pagination.current = this.state.nextIndex;
  };
  lastHandle = () => {
    store.pagination.current = this.state.lastIndex;
  };

  render = () => pug`
    if !props.isNext
      if current > 2
        PageItem(classes="page-item--back" link=this.state.prevIndex clickHandle=this.prevHandle)
          PageIcon(icon="angle_left")
          PageText(value="Предыдущая")
      else
        PageItem(classes=this.getItemClasses(0) link=0 clickHandle=this.firstHandle) 1
    else
      if current < count - 3
        PageItem(classes="page-item--next" link=this.state.nextIndex clickHandle=this.nextHandle)
          PageText(value="Следующая")
          PageIcon(icon="angle_right")
      else
        PageItem(classes=this.getItemClasses(this.state.lastIndex) link=this.state.lastIndex clickHandle=this.lastHandle)= count
  `;
}
