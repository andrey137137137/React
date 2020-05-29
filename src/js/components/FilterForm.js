import React, { Component } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import SvgCmp from "@cmp/SvgCmp";
import { getSwitchedClass } from "@help/classes";

@observer
export default class FilterForm extends Component {
  @observable activeTab = 2;
  @observable tabs = [
    { name: "Все", active: 1 },
    { name: "Сериалы", active: 2 },
    { name: "Передачи", active: "3active" }
  ];
  @observable channels = [
    { name: "Первый", img: 0 },
    { name: "ТНТ", img: 1 },
    { name: "Россия 1", img: 2 },
    { name: "Первый", img: 0 },
    { name: "ТНТ", img: 1 },
    { name: "Россия 1", img: 2 },
    { name: "ТНТ", img: 0 }
  ];
  @observable channelSelect = [1, 2, 3, 4, 5];
  @observable genres = ["Боевик", "Ужасы", "Фантастика", "Комедия"];
  @observable filters = ["Все года...", "Все возраста...", "Все страны..."];

  @computed get formClasses() {
    return (
      "form section section--tabs_wrap filter_form mt-md-n1 " +
      getSwitchedClass(!store.showFilter, "d-none")
    );
  }
  @action getTabItemClasses(index) {
    return (
      "nav-item filter_form-item " +
      getSwitchedClass(index == this.activeTab, "nav-item--active")
    );
  }
  @action getTabLinkClasses(index) {
    return (
      "nav-link filter_form-link " +
      getSwitchedClass(index == this.activeTab, "active")
    );
  }
  @action getChannelClass(index) {
    return "filter_form-channel--item_" + (index + 1);
  }
  @action getTabKey(index) {
    return this.tabs[index].active;
  }
  @action tabHandle = (e, index) => {
    e.preventDefault();
    console.log(this.activeTab);

    if (this.activeTab == index) return;

    this.tabs[this.activeTab].active = this.activeTab;
    this.activeTab = index;
    this.tabs[index].active = index + "active";
  };

  render() {
    return pug`
      form.form.section.section--tabs_wrap.filter_form.mt-md-n1(className=this.formClasses action="")
        .row.section-header
          .col-12.col-md-auto.navbar.section-top
            h3.navbar-brand.section-top_title Фильтр
            button.btn.btn-link.filter_form-reset(type="reset") Сбросить
          ul.col.nav.nav-tabs.order-md-first.filter_form-tabs
            each item, index in this.tabs
              li.nav-item.filter_form-item(key=item.active className=this.getTabItemClasses(index))
                a.nav-link.filter_form-link(href="" className=this.getTabLinkClasses(index) onClick=(e) => this.tabHandle(e, index))= item.name
        .row.section-body.filter_form-row
          //- .col-12.px-0
          .col-12
            .row.no-gutters.justify-content-between
              .col.col-md-auto
                //- input.form-control.filter_form-control.filter_form-channel_control.filter_form-channel_control--active(placeholder="Все каналы")
                button.btn.btn-outline-secondary.active.filter_form-channel(type="button") Все каналы
              each item, index in this.channels
                .col.filter_form-channel_wrap(key=index)
                  button.btn.btn-outline-secondary.filter_form-channel(className=this.getChannelClass(item.img) type="button")
                  span.filter_form-channel_title= item.name
              .col-auto.d-none.d-md-block
                select.form-control.filter_form-channel_dropbox
                  each item, index in this.channelSelect
                    option(key=index)= item
          //- .col-12.col-sm-6.col-md-3.filter_form-control_wrap.mt-13
          .col-12.col-sm-6.col-md-3.filter_form-control_wrap
            .filter_form-control.filter_form-control--active
              each item, index in this.genres
                .filter_form_category(key=index)
                  .filter_form_category-text= item
                  a.icon.filter_form_category-close(href="")
                    SvgCmp(icon="close" classes="icon-symbol")
          each item, index in this.filters
            //- .col-12.col-sm-6.col-md-3.filter_form-control_wrap.mt-14
            .col-12.col-sm-6.col-md-3.filter_form-control_wrap(key=index)
              input.form-control.filter_form-control(placeholder=item)
          .col-12.mt-17
            .row.mx-0
              button.col-12.col-md-auto.btn.btn-secondary(type="submit") Применить
              button.d-none.col-auto.ml-10.btn.btn-secondary(type="reset") Сбросить`;
  }
}
