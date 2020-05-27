import React from "react";
import ReactDOM from "react-dom";
import store from "@store";
import FilterBtn from "@cmp/FilterBtn";
import SwitcherBtn from "@cmp/SwitcherBtn";
import FilterForm from "@cmp/FilterForm";
import CardContainer from "@cardCmp/CardContainer";
import PaginationCmp from "@cmp/PaginationCmp";

ReactDOM.render(
  <FilterBtn store={store} />,
  document.getElementById("reactFilterBtn")
);

ReactDOM.render(
  <SwitcherBtn store={store} />,
  document.getElementById("reactSwitcherBtn")
);

ReactDOM.render(
  <FilterForm store={store} />,
  document.getElementById("reactFilterForm")
);

ReactDOM.render(
  <CardContainer store={store} />,
  document.getElementById("reactCardContainer")
);

ReactDOM.render(
  <PaginationCmp store={store} />,
  document.getElementById("reactPaginationCmp")
);
