import React, { Component } from "react";
import ReactDOM from "react-dom";

var app = new Vue({
  el: "#app",
  data: {
    activeTab: 2,
    showFilter: true,
    byRows: false,
  },
  computed: {
    containerClasses: function () {
      return {
        // "main-container--blocks": !this.byRows,
        "section-pill": !this.byRows,
        // "main-container--rows": this.byRows,
        "p-0": this.byRows,
      };
    },
    cardClasses: function () {
      return {
        col: !this.byRows,
        "card--block": !this.byRows,
        "section-pill": this.byRows,
        "card--row": this.byRows,
      };
    },
  },
  methods: {
    getTabItemClass: function (index) {
      return {
        "nav-item--active": this.activeTab == index,
      };
    },
    getTabLinkClass: function (index) {
      return {
        active: this.activeTab == index,
      };
    },
  },
});

const getSwitchedClass = (cond, className) => (cond ? " " + className : "");

class SvgCmp extends Component {
  constructor(props) {
    super(props);
    this.state = { icon: "#" + props.icon };
  }
  render() {
    return (
      <svg className={this.props.classes}>
        <use xlinkHref={this.state.icon} />
      </svg>
    );
  }
}

class NavLink extends Component {
  constructor(props) {
    super(props);

    const finalClasses = props.finalClasses ? " " + props.finalClasses : "";
    this.state = {
      classes: "nav-link " + props.classes + " filter-link" + finalClasses,
    };
    this.handle = this.handle.bind(this);
  }
  handle(e) {
    e.preventDefault();
    this.props.handle();
  }
  render() {
    return (
      <a className={this.state.classes} onClick={this.handle(e)} href="">
        {this.props.children}
      </a>
    );
  }
}

class FilterBtn extends Component {
  constructor(props) {
    super(props);

    const linkCommonClasses =
      "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round";
    const iconSwitchedClass = "icon--success";
    const iconSuccessClass = getSwitchedClass(
      props.showFilter,
      iconSwitchedClass,
    );

    const textCommonClasses = "d-none d-md-inline-block pr-md-17 filter-text";
    const textSwitchedClass = "text-success";
    const textSuccessClass = getSwitchedClass(
      props.showFilter,
      textSwitchedClass,
    );

    this.state = {
      showFilter: props.showFilter,
      linkCommonClasses,
      textCommonClasses,
      iconSwitchedClass,
      textSwitchedClass,
      linkClasses: linkCommonClasses + iconSuccessClass,
      textClasses: textCommonClasses + textSuccessClass,
    };
    this.handle = this.handle.bind(this);
  }
  handle() {
    const switcher = this.state.showFilter;

    this.setState({
      showFilter: !switcher,
      linkClasses:
        this.state.linkCommonClasses +
        getSwitchedClass(switcher, this.state.iconSwitchedClass),
      textClasses:
        this.state.textCommonClasses +
        getSwitchedClass(switcher, this.state.textSwitchedClass),
    });
  }
  render() {
    return (
      <NavLink classes={this.state.linkClasses} handle={this.handle}>
        <div className="icon-bg"></div>
        <span className={this.state.textClasses}> Фильтр </span>
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

class SwitcherBtn extends Component {
  constructor(props) {
    super(props);

    const iconCommonClasses = "icon";
    const switchedClass = "icon--success";
    const rowsSuccessClass = getSwitchedClass(props.byRows, switchedClass);
    const squarsSuccessClass = getSwitchedClass(!props.byRows, switchedClass);

    this.state = {
      byRows: props.byRows,
      linkPostClasses: "filter-link--switcher",
      iconCommonClasses,
      switchedClass,
      rowsSuccessClass: iconCommonClasses + rowsSuccessClass,
      squarsSuccessClass: iconCommonClasses + squarsSuccessClass,
    };
    this.rowsHandle = this.rowsHandle.bind(this);
    this.squarsHandle = this.squarsHandle.bind(this);
  }
  rowsHandle() {
    const switcher = true;

    this.setState({
      byRows: switcher,
      rowsSuccessClass:
        this.state.iconCommonClasses +
        getSwitchedClass(switcher, this.state.switchedClass),
      squarsSuccessClass:
        this.state.iconCommonClasses +
        getSwitchedClass(!switcher, this.state.switchedClass),
    });
  }
  squarsHandle() {
    const switcher = false;

    this.setState({
      byRows: switcher,
      rowsSuccessClass:
        this.state.iconCommonClasses +
        getSwitchedClass(!switcher, this.state.switchedClass),
      squarsSuccessClass:
        this.state.iconCommonClasses +
        getSwitchedClass(switcher, this.state.switchedClass),
    });
  }
  render() {
    return (
      <>
        <span className="pr-sm-0.pr-md-13.filter-text"> Вид </span>
        <div className="filter-icons.pl-1.pr-2">
          <NavLink
            classes={this.state.linkPostClasses}
            handle={this.rowsHandle}
          >
            <SvgCmp icon="bars" classes={this.state.rowsSuccessClass} />
          </NavLink>
          <NavLink
            classes={this.state.linkPostClasses}
            handle={this.squarsHandle}
          >
            <SvgCmp icon="th-large" classes={this.state.squarsSuccessClass} />
          </NavLink>
        </div>
      </>
    );
  }
}
