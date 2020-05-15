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

const getSwitchedClass = (cond, className) => (cond ? " " + className : "");
function getComputedClasses(
  commonClasses,
  switchedClass,
  cond,
  isFirst = false,
) {
  const computed = commonClasses + (cond ? " " + switchedClass : "");

  if (!isFirst) {
    return computed;
  }

  return {
    common: commonClasses,
    switched: switchedClass,
    computed,
  };
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
      linkClasses: getComputedClasses(
        "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round",
        "icon--success",
        props.showFilter,
        true,
      ),
      textClasses: getComputedClasses(
        "d-none d-md-inline-block pr-md-17 filter-text",
        "text-success",
        props.showFilter,
        true,
      ),
    };
    this.handle = this.handle.bind(this);
  }
  handle() {
    const switcher = !this.state.showFilter;

    this.setState({
      showFilter: switcher,
      linkClasses: getComputedClasses(
        this.state.linkClasses.common,
        this.state.linkClasses.switched,
        switcher,
      ),
      textClasses: getComputedClasses(
        this.state.textClasses.common,
        this.state.textClasses.switched,
        switcher,
      ),
    });
  }
  render() {
    return (
      <NavLink classes={this.state.linkClasses.computed} handle={this.handle}>
        <div className="icon-bg"></div>
        <span className={this.state.textClasses.computed}> Фильтр </span>
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

class FilterForm extends Component {
  constructor(props) {
    super(props);

    const commonClasses =
      "form.section.section--tabs_wrap.filter_form.mt-md-n1";
    const switchedClass = "d-none";
    const successClasses = getSwitchedClass(props.showFilter, switchedClass);

    const tabItemCommonClasses = ".nav-item.filter_form-item";
    const tabItemSwitchedClass = "nav-item--active";

    const tabLinkCommonClasses = ".nav-link.filter_form-link";

    this.state = {
      commonClasses,
      switchedClass,
      successClasses,
      showFilter: props.showFilter,
      activeTab: 2,
    };
  }
  getTabItemClass(index) {
    return {
      "nav-item--active": this.state.activeTab == index,
    };
  }
  getTabLinkClass(index) {
    return {
      active: this.state.activeTab == index,
    };
  }
  render() {
    return (
      <form className={this.state.successClasses} action="">
        <div className=".row.section-header">
          <div className=".col-12.col-md-auto.navbar.section-top">
            <h3 className=".navbar-brand.section-top_title"> Фильтр </h3>
            <button className=".btn.btn-link.filter_form-reset" type="reset">
              Сбросить
            </button>
          </div>
          <ul className=".col.nav.nav-tabs.order-md-first.filter_form-tabs">
            <li
              className=".nav-item.filter_form-item"
              class="getTabItemClass(0)"
            >
              <a
                className=".nav-link.filter_form-link"
                href=""
                class="getTabLinkClass(0)"
                onClick={this.setState({ activeTab: 0 })}
              >
                Все
              </a>
            </li>
          </ul>
        </div>
        <div className=".row.section-body.filter_form-row">
          <div className=".col-12">
            <div className=".row.no-gutters.justify-content-between">
              <div className=".col.col-md-auto">
                <button
                  className=".btn.btn-outline-secondary.active.filter_form-channel"
                  type="button"
                >
                  Все каналы
                </button>
              </div>
              <div className=".col-auto.d-none.d-md-block">
                <select className=".form-control.filter_form-channel_dropbox"></select>
              </div>
            </div>
          </div>
          <div className=".col-12.col-sm-6.col-md-3.filter_form-control_wrap">
            <div className=".filter_form-control.filter_form-control--active">
              <div className=".filter_form_category">
                <div className=".filter_form_category-text"> Фантастика </div>
                <a className=".icon.filter_form_category-close" href="">
                  <SvgCmp icon="close" classes="icon-symbol" />
                </a>
              </div>
            </div>
          </div>
          <div className=".col-12.col-sm-6.col-md-3.filter_form-control_wrap">
            <input
              className=".form-control.filter_form-control"
              placeholder="Все года..."
            />
          </div>
          <div className=".col-12.mt-17">
            <div className=".row.mx-0">
              <button
                className=".col-12.col-md-auto.btn.btn-secondary"
                type="submit"
              >
                Применить
              </button>
              <button
                className=".d-none.col-auto.ml-10.btn.btn-secondary"
                type="reset"
              >
                Сбросить
              </button>
            </div>
          </div>
        </div>
      </form>
    );
  }
}
