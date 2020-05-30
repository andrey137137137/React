import React, { Component } from "react";
import { computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import PageArrow from "@paginationCmp/PageArrow";
import PageItem from "@paginationCmp/PageItem";
import { getComputedClasses } from "@help/classes";

@observer
export default class PaginationCmp extends Component {
  @computed get pages() {
    const array = [];

    for (let i = 0; i < store.pagination.count; i++) {
      array.push(i + 1);
    }

    return array;
  }
  @computed get isArrows() {
    return store.pagination.count > 5;
  }

  @action showAll(index) {
    const { count, current } = store.pagination;
    const lastIndex = count - 1;
    let cond;

    switch (current) {
      case 0:
        cond = index <= current + 2;
        break;
      case lastIndex:
        cond = index >= current - 2;
        break;
      default:
        cond = index >= current - 1 && index <= current + 1;
    }

    // return index != 0 && index != lastIndex && cond;
    return !this.isArrows || (index != 0 && index != lastIndex && cond);
  }
  @action getItemClasses(index) {
    const { current } = store.pagination;

    return getComputedClasses([
      {
        // cond: index == current - 1 || index == current + 1,
        cond: this.isArrows && (index == current - 1 || index == current + 1),
        value: "d-none d-md-block"
      },
      { cond: index == current, value: "active" }
    ]);
  }
  @action itemHandle = index => {
    store.pagination.current = index;
  };

  render() {
    const { count, current } = store.pagination;
    return pug`
      if count > 1
        ul.col-auto.pagination.mb-6.pr-19.pr-md-20
          if this.isArrows
            PageArrow(isNext=false)
          each item, index in this.pages
            if (this.showAll(index))
              PageItem(key=index classes=this.getItemClasses(index) link=index clickHandle=() => this.itemHandle(index))= item
          if this.isArrows
            PageArrow(isNext=true)
        //- .col-auto.pl-2.pr-0.page-status Страница #{this.pages[current]} из #{count}
        .col-auto.pl-2.page-status Страница #{this.pages[current]} из #{count}
    `;
  }
}
