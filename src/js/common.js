import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, configure, computed, action } from "mobx";
import { observer } from "mobx-react";
// configure({ enforceActions: "observed" });

// var app = new Vue({
//   el: "#app",
//   data: {
//     activeTab: 2,
//     showFilter: true,
//     byRows: false,
//   },
//   computed: {
//     containerClasses: function () {
//       return {
//         // "main-container--blocks": !this.byRows,
//         "section-pill": !this.byRows,
//         // "main-container--rows": this.byRows,
//         "p-0": this.byRows,
//       };
//     },
//     cardClasses: function () {
//       return {
//         col: !this.byRows,
//         "card--block": !this.byRows,
//         "section-pill": this.byRows,
//         "card--row": this.byRows,
//       };
//     },
//   },
//   methods: {
//     getTabItemClass: function (index) {
//       return {
//         "nav-item--active": this.activeTab == index,
//       };
//     },
//     getTabLinkClass: function (index) {
//       return {
//         active: this.activeTab == index,
//       };
//     },
//   },
// });

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

    const navClass = "nav-link";
    const filterClass = "filter-link";
    const finalClasses = props.finalClasses ? " " + props.finalClasses : "";

    this.state = {
      navClass,
      filterClass,
      classes: `${navClass} ${props.classes} ${filterClass}${finalClasses}`,
    };
  }
  handle = (e) => {
    e.preventDefault();

    this.setState((state, props) => ({
      classes: `${state.navClass} ${props.classes} ${state.filterClass}${
        props.finalClasses ? " " + props.finalClasses : ""
      }`,
    }));
    this.props.clickHandle();
  };
  render() {
    return (
      <a className={this.state.classes} onClick={this.handle} href="">
        {this.props.children}
      </a>
    );
  }
}

const getSwitchedClass = (cond, className) => (cond ? className : "");

function getComputedClasses(commonClasses, switchedClass) {
  return {
    common: commonClasses,
    switched: switchedClass,
  };
}

@observer
class FilterBtn extends Component {
  @observable showFilter = this.props.showFilter;
  @observable linkClasses = getComputedClasses(
    "pr-7 pb-7 p-md-0 icon icon--round filter-icon filter-icon--round",
    "icon--success",
  );
  @observable textClasses = getComputedClasses(
    "d-none d-md-inline-block pr-md-17 filter-text",
    "text-success",
  );

  @computed get linkComputedClasses() {
    return (
      this.linkClasses.common +
      " " +
      getSwitchedClass(this.showFilter, this.linkClasses.switched)
    );
  }
  @computed get textComputedClasses() {
    return (
      this.textClasses.common +
      " " +
      getSwitchedClass(this.showFilter, this.textClasses.switched)
    );
  }

  @action handle = () => {
    this.showFilter = !this.showFilter;
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

@observer
class SwitcherBtn extends Component {
  @observable byRows = this.props.byRows;
  @observable linkPostClasses = "filter-link--switcher";
  @observable iconClasses = getComputedClasses("icon", "icon--success");

  @computed get rowsClasses() {
    return (
      this.iconClasses.common +
      " " +
      getSwitchedClass(this.byRows, this.iconClasses.switched)
    );
  }
  @computed get squarsClasses() {
    return (
      this.iconClasses.common +
      " " +
      getSwitchedClass(!this.byRows, this.iconClasses.switched)
    );
  }

  @action rowsHandle = () => {
    this.byRows = true;
  };
  @action squarsHandle = () => {
    this.byRows = false;
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

@observer
class FilterForm extends Component {
  @observable showFilter = this.props.showFilter;
  @observable activeTab = 2;
  @observable formClasses = getComputedClasses(
    "form section section--tabs_wrap filter_form mt-md-n1",
    "d-none",
  );
  @observable tabItemClasses = getComputedClasses(
    "nav-item filter_form-item",
    "nav-item--active",
  );
  @observable tabLinkClasses = getComputedClasses(
    "nav-link filter_form-link",
    "nav-link--active",
  );
  @observable tabs = ["Все", "Сериалы", "Передачи"];
  @observable channels = ["Первый", "ТНТ", "Россия 1"];
  @observable channelSelect = [1, 2, 3, 4, 5];
  @observable genres = ["Боевик", "Ужасы", "Фантастика", "Комедия"];
  @observable filters = ["Все года...", "Все возраста...", "Все страны..."];

  @computed get formComputedClasses() {
    return (
      this.formClasses.common +
      " " +
      getSwitchedClass(this.showFilter, this.formClasses.switched)
    );
  }
  @computed get tabItemComputedClasses() {
    return (
      this.tabItemClasses.common +
      " " +
      getSwitchedClass(this.activeTab, this.tabItemClasses.switched)
    );
  }
  @computed get tabLinkComputedClasses() {
    return (
      this.tabLinkClasses.common +
      " " +
      getSwitchedClass(this.activeTab, this.tabLinkClasses.switched)
    );
  }

  @action getTabItemClass = (index) => {
    return {
      "nav-item--active": this.state.activeTab == index,
    };
  };
  @action getTabLinkClass = (index) => {
    return {
      active: this.state.activeTab == index,
    };
  };
  @action tabHandle = (index) => {
    this.activeTab = index;
  };

  render() {
    return (
      <form className={this.formComputedClasses} action="">
        <div className="row section-header">
          <div className="col-12 col-md-auto navbar section-top">
            <h3 className="navbar-brand section-top_title"> Фильтр </h3>
            <button className="btn btn-link filter_form-reset" type="reset">
              Сбросить
            </button>
          </div>
          <ul className="col nav nav-tabs order-md-first filter_form-tabs">
            {this.tabs.map((value, index) => (
              <li
                key={index}
                className={this.tabItemComputedClasses}
                class={() => this.getTabItemClass(index)}
              >
                <a
                  className={this.tabLinkComputedClasses}
                  href=""
                  class={() => this.getTabLinkClass(index)}
                  onClick={() => this.tabHandle(index)}
                >
                  {value}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="row section-body filter_form-row">
          <div className="col-12">
            <div className="row no-gutters justify-content-between">
              <div className="col col-md-auto">
                <button
                  className="btn btn-outline-secondary active filter_form-channel"
                  type="button"
                >
                  Все каналы
                </button>
              </div>
              <div className="col-auto d-none d-md-block">
                <select className="form-control filter_form-channel_dropbox">
                  {this.channelSelect.map((value, index) => (
                    <option key={index}> {value} </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="col-12 col-sm-6 col-md-3 filter_form-control_wrap">
            <div className="filter_form-control filter_form-control--active">
              {this.genres.map((value, index) => (
                <div key={index} className="filter_form_category">
                  <div className="filter_form_category-text"> {value} </div>
                  <a className="icon filter_form_category-close" href="">
                    <SvgCmp icon="close" classes="icon-symbol" />
                  </a>
                </div>
              ))}
            </div>
          </div>
          {this.filters.map((value, index) => (
            <div
              key={index}
              className="col-12 col-sm-6 col-md-3 filter_form-control_wrap"
            >
              <input
                className="form-control filter_form-control"
                placeholder={value}
              />
            </div>
          ))}
          <div className="col-12 mt-17">
            <div className="row mx-0">
              <button
                className="col-12 col-md-auto btn btn-secondary"
                type="submit"
              >
                Применить
              </button>
              <button
                className="d-none col-auto ml-10 btn btn-secondary"
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

ReactDOM.render(
  <FilterBtn showFilter={false} />,
  document.getElementById("reactFilterBtn"),
);

ReactDOM.render(
  <SwitcherBtn byRows={true} />,
  document.getElementById("reactSwitcherBtn"),
);
