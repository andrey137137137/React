import React, { Component } from "react";
import { computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import NavLink from "@cmp/NavLink";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass } from "@help/classes";

@observer
export default class FilterBtn extends Component {
  @computed get linkClasses() {
    return (
      "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round " +
      getSwitchedClass(store.showFilter, "icon--success")
    );
  }
  @computed get textClasses() {
    return getSwitchedClass(store.showFilter, "text-success");
  }

  @action handle = () => {
    const { showFilter } = store;
    store.showFilter = !showFilter;
  };

  render() {
    return pug`
      NavLink(classes=this.linkClasses clickHandle=this.handle)
        .icon-bg
        span.d-none.d-md-inline-block.pr-md-17.filter-text(className=this.textClasses) Фильтр
        .icon-symbol_wrap
          SvgCmp(icon="filter" classes="icon-symbol filter-icon filter-icon--filter")
    `;
  }
}
