import React, { Component } from "react";
import { computed, action } from "mobx";
import { observer } from "mobx-react";
import NavLink from "@cmp/NavLink";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass } from "@help/classes";

export default
@observer
class FilterBtn extends Component {
  @computed get linkClasses() {
    return (
      "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round " +
      getSwitchedClass(this.props.store.showFilter, "icon--success")
    );
  }
  @computed get textClasses() {
    return (
      "d-none d-md-inline-block pr-md-17 filter-text " +
      getSwitchedClass(this.props.store.showFilter, "text-success")
    );
  }

  @action handle = () => {
    const { showFilter } = this.props.store;
    this.props.store.showFilter = !showFilter;
  };

  render() {
    return (
      <NavLink classes={this.linkClasses} clickHandle={this.handle}>
        <div className="icon-bg"></div>
        <span className={this.textClasses}> Фильтр </span>
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
