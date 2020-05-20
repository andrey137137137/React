import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import NavLink from "@cmp/NavLink";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass, getComputedClasses } from "@help/classes";

export default
@observer
class FilterBtn extends Component {
  @observable linkClasses = getComputedClasses(
    "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round",
    "icon--success",
  );
  @observable textClasses = getComputedClasses(
    "d-none d-md-inline-block pr-md-17 filter-text",
    "text-success",
  );

  @computed get linkComputedClasses() {
    const { showFilter } = this.props.store;
    return (
      this.linkClasses.common +
      " " +
      getSwitchedClass(showFilter, this.linkClasses.switched)
    );
  }
  @computed get textComputedClasses() {
    const { showFilter } = this.props.store;
    return (
      this.textClasses.common +
      " " +
      getSwitchedClass(showFilter, this.textClasses.switched)
    );
  }

  @action handle = () => {
    const { showFilter } = this.props.store;
    this.props.store.showFilter = !showFilter;
  };

  render() {
    return (
      <NavLink classes={this.linkComputedClasses} clickHandle={this.handle}>
        <div className="icon-bg"></div>
        <span className={this.textComputedClasses}> Фильтр </span>
        <div className="icon-symbol_wrap">
          <SvgCmp
            icon="filter"
            classes="icon-symbol filter-icon filter-icon--filter"
          />
        </div>
      </NavLink>
    );
  }
}
