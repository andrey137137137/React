import React from "react";
import ReactDOM from "react-dom";
import FilterBtn from "@cmp/FilterBtn";
import SwitcherBtn from "@cmp/SwitcherBtn";
import FilterForm from "@cmp/FilterForm";
import CardsContainer from "@cardCmp/CardsContainer";
import PaginationCmp from "@cmp/PaginationCmp";

ReactDOM.render(<FilterBtn />, document.getElementById("reactFilterBtn"));
ReactDOM.render(<SwitcherBtn />, document.getElementById("reactSwitcherBtn"));
ReactDOM.render(<FilterForm />, document.getElementById("reactFilterForm"));
ReactDOM.render(
  <CardsContainer />,
  document.getElementById("reactCardsContainer")
);
ReactDOM.render(
  <PaginationCmp />,
  document.getElementById("reactPaginationCmp")
);
