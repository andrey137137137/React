import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import SvgCmp from "@cmp/SvgCmp";
import PageItem from "@paginationCmp/PageItem";
import { getComputedClasses } from "@help/classes";

const PageIcon = props => pug`
  //- span.icon.page-text.page-icon(className="icon-" + props.icon)
  SvgCmp(icon="angle", classes="icon icon-" + props.icon + " page-text page-icon")
`;

const PageText = props => pug`
  span.d-none.d-md-block.page-text= props.value
`;

@observer
export default class PageArrow extends Component {
  @observable step = 2;

  @computed get prevIndex() {
    return store.pagination.current - this.step;
  }
  @computed get nextIndex() {
    return store.pagination.current + this.step;
  }
  @computed get lastIndex() {
    return store.pagination.count - 1;
  }

  @action getItemClasses = (index, hiddenClasses = false) => {
    const { current } = store.pagination;
    return getComputedClasses([{ cond: index == current, value: "active" }]);
  };
  @action correctStep = () => {
    switch (store.pagination.current) {
      case 0:
      case this.lastIndex:
        this.step = 3;
        break;
      default:
        this.step = 2;
    }
  };
  @action prevHandle = () => {
    this.correctStep();
    store.pagination.current = this.prevIndex;
  };
  @action firstHandle = () => {
    this.correctStep();
    store.pagination.current = 0;
  };
  @action nextHandle = () => {
    this.correctStep();
    store.pagination.current = this.nextIndex;
  };
  @action lastHandle = () => {
    this.correctStep();
    store.pagination.current = this.lastIndex;
  };

  render() {
    const { count, current } = store.pagination;
    return pug`
    if !this.props.isNext
      if current > 2
        PageItem(classes="page-item--back" link=this.prevIndex clickHandle=this.prevHandle)
          PageIcon(icon="angle_left")
          PageText(value="Предыдущая")
      else
        PageItem(classes=this.getItemClasses(0) link=0 clickHandle=this.firstHandle) 1
    else
      if current < count - 3
        PageItem(classes="page-item--next" link=this.nextIndex clickHandle=this.nextHandle)
          PageText(value="Следующая")
          PageIcon(icon="angle_right")
      else
        PageItem(classes=this.getItemClasses(this.lastIndex) link=this.lastIndex clickHandle=this.lastHandle)= count
  `;
  }
}
