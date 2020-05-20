import React from "react";
import ReactDOM from "react-dom";
import { observable } from "mobx";
import FilterBtn from "@cmp/FilterBtn";
import SwitcherBtn from "@cmp/SwitcherBtn";
import FilterForm from "@cmp/FilterForm";
import CardContainer from "@cmp/CardContainer";

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

const store = observable({ showFilter: false, byRows: true });

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

ReactDOM.render(
  <CardContainer store={store} />,
  document.getElementById("reactCardContainer"),
);
