import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observable, configure, computed, action } from "mobx";
import { observer } from "mobx-react";
configure({ enforceActions: "observed" });

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

const store = observable({ showFilter: false, byRows: true });

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

@observer
class SwitcherBtn extends Component {
  @observable linkPostClasses = "filter-link--switcher";
  @observable iconClasses = getComputedClasses("icon", "icon--success");

  @computed get rowsClasses() {
    const { byRows } = this.props.store;
    return (
      this.iconClasses.common +
      " " +
      getSwitchedClass(byRows, this.iconClasses.switched)
    );
  }
  @computed get squarsClasses() {
    const { byRows } = this.props.store;
    return (
      this.iconClasses.common +
      " " +
      getSwitchedClass(!byRows, this.iconClasses.switched)
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

@observer
class FilterForm extends Component {
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
    "active",
  );
  @observable tabs = [
    { name: "Все", active: false },
    { name: "Сериалы", active: false },
    { name: "Передачи", active: true },
  ];
  @observable channels = ["Первый", "ТНТ", "Россия 1"];
  @observable channelSelect = [1, 2, 3, 4, 5];
  @observable genres = ["Боевик", "Ужасы", "Фантастика", "Комедия"];
  @observable filters = ["Все года...", "Все возраста...", "Все страны..."];

  @computed get formComputedClasses() {
    const { showFilter } = this.props.store;
    return (
      this.formClasses.common +
      " " +
      getSwitchedClass(!showFilter, this.formClasses.switched)
    );
  }
  @action tabItemComputedClasses(index) {
    return (
      this.tabItemClasses.common +
      " " +
      getSwitchedClass(this.tabs[index].active, this.tabItemClasses.switched)
    );
  }
  @action tabLinkComputedClasses(index) {
    return (
      this.tabLinkClasses.common +
      " " +
      getSwitchedClass(this.tabs[index].active, this.tabLinkClasses.switched)
    );
  }
  @action tabHandle = (e, index) => {
    e.preventDefault();
    console.log(this.activeTab);

    if (this.activeTab == index) return;

    this.tabs[this.activeTab].name = this.tabs[this.activeTab].name;
    this.tabs[this.activeTab].active = false;
    this.activeTab = index;
    this.tabs[this.activeTab].active = true;
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
            {this.tabs.map((item, index) => (
              <li key={index} className={this.tabItemComputedClasses(index)}>
                <a
                  className={this.tabLinkComputedClasses(index)}
                  href=""
                  onClick={(e) => this.tabHandle(e, index)}
                >
                  {item.name}
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
  <FilterBtn store={store} />,
  document.getElementById("reactFilterBtn"),
);

ReactDOM.render(
  <SwitcherBtn store={store} />,
  document.getElementById("reactSwitcherBtn"),
);

ReactDOM.render(
  <FilterForm store={store} />,
  document.getElementById("reactFilterForm"),
);
