import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass } from "@help/classes";

export default
@observer
class FilterForm extends Component {
  @observable activeTab = 2;
  @observable tabs = [
    { name: "Все", active: false },
    { name: "Сериалы", active: false },
    { name: "Передачи", active: true }
  ];
  @observable channels = ["Первый", "ТНТ", "Россия 1"];
  @observable channelSelect = [1, 2, 3, 4, 5];
  @observable genres = ["Боевик", "Ужасы", "Фантастика", "Комедия"];
  @observable filters = ["Все года...", "Все возраста...", "Все страны..."];

  @computed get formClasses() {
    return (
      "form section section--tabs_wrap filter_form mt-md-n1 " +
      getSwitchedClass(!this.props.store.showFilter, "d-none")
    );
  }
  @action tabItemClasses(index) {
    return (
      "nav-item filter_form-item " +
      getSwitchedClass(this.tabs[index].active, "nav-item--active")
    );
  }
  @action tabLinkClasses(index) {
    return (
      "nav-link filter_form-link " +
      getSwitchedClass(this.tabs[index].active, "active")
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
      <form className={this.formClasses} action="">
        <div className="row section-header">
          <div className="col-12 col-md-auto navbar section-top">
            <h3 className="navbar-brand section-top_title"> Фильтр </h3>
            <button className="btn btn-link filter_form-reset" type="reset">
              Сбросить
            </button>
          </div>
          <ul className="col nav nav-tabs order-md-first filter_form-tabs">
            {this.tabs.map((item, index) => (
              <li key={index} className={this.tabItemClasses(index)}>
                <a
                  className={this.tabLinkClasses(index)}
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
