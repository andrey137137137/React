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
  @action getTabItemClasses(index) {
    return (
      "nav-item filter_form-item " +
      getSwitchedClass(this.tabs[index].active, "nav-item--active")
    );
  }
  @action getTabLinkClasses(index) {
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
    return pug`
      form.form.section.section--tabs_wrap.filter_form.mt-md-n1(className=this.formClasses action="")
        .row.section-header
          .col-12.col-md-auto.navbar.section-top
            h3.navbar-brand.section-top_title Фильтр
            button.btn.btn-link.filter_form-reset(type="reset") Сбросить
          ul.col.nav.nav-tabs.order-md-first.filter_form-tabs
            each item, index in this.tabs
              li.nav-item.filter_form-item(key=index className=this.getTabItemClasses(index))
                a.nav-link.filter_form-link(href="" className=this.getTabLinkClasses(index) onClick=(e) => this.tabHandle(e, index))= item.name
        .row.section-body.filter_form-row
          //- .col-12.px-0
          .col-12
            .row.no-gutters.justify-content-between
              .col.col-md-auto
                //- input.form-control.filter_form-control.filter_form-channel_control.filter_form-channel_control--active(placeholder="Все каналы")
                button.btn.btn-outline-secondary.active.filter_form-channel(type="button") Все каналы
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
