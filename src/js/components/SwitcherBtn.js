import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import NavLink from "@cmp/NavLink";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass } from "@help/classes";

export default
@observer
class SwitcherBtn extends Component {
  @observable linkPostClasses = "filter-link--switcher";
  @observable iconCommonClasses = "icon";
  @observable iconSwitchedClass = "icon--success";

  @computed get rowsClasses() {
    return (
      this.iconCommonClasses +
      " " +
      getSwitchedClass(this.props.store.byRows, this.iconSwitchedClass)
    );
  }
  @computed get squarsClasses() {
    return (
      this.iconCommonClasses +
      " " +
      getSwitchedClass(!this.props.store.byRows, this.iconSwitchedClass)
    );
  }

  @action rowsHandle = () => {
    this.props.store.byRows = true;
  };
  @action squarsHandle = () => {
    this.props.store.byRows = false;
  };

  render() {
    return (
      <>
        <span className="pr-sm-0 pr-md-13 filter-text"> Вид </span>
        <div className="filter-icons pl-1 pr-2">
          <NavLink classes={this.linkPostClasses} clickHandle={this.rowsHandle}>
            <SvgCmp icon="bars" classes={this.rowsClasses} />
          </NavLink>
          <NavLink
            classes={this.linkPostClasses}
            clickHandle={this.squarsHandle}
          >
            <SvgCmp icon="th-large" classes={this.squarsClasses} />
          </NavLink>
        </div>
      </>
    );
  }
}
