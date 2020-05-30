import React, { Component, Fragment } from "react";
import { computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import PageArrow from "@paginationCmp/PageArrow";
import { getComputedClasses } from "@help/classes";

const { count, current } = store.pagination;

const getItemClasses = (index, hiddenClasses = false) => {
  const classes = hiddenClasses ? [hiddenClasses] : [];

  return getComputedClasses([
    ...classes,
    { cond: index == current, value: "active" }
  ]);
};

@observer
export default class PaginationCmp extends Component {
  @computed get pages() {
    const array = [];

    for (let i = 0; i < count; i++) {
      array.push(i + 1);
    }

    return array;
  }
  // @computed get isArrows() {
  //   return count > 5;
  // }

  @action showAll(index) {
    let cond;

    switch (current) {
      case 0:
        cond = index <= current + 2;
        break;
      case count - 1:
        cond = index >= current - 2;
        break;
      default:
        cond = index >= current - 1 && index <= current + 1;
    }

    // return !this.isArrows || cond;
    return cond;
  }
  @action getItemClasses(index) {
    // const hiddenCond =
    //   this.isArrows && (index == current - 1 || index == current + 1);
    const hiddenCond = index == current - 1 || index == current + 1;

    return getComputedClasses([
      {
        cond: hiddenCond,
        value: "d-none d-md-block"
      },
      { cond: index == current, value: "active" }
    ]);
  }
  @action itemHandle = index => {
    store.pagination.current = index;
  };

  render() {
    return pug`
      Fragment
        ul.col-auto.pagination.mb-6.pr-19.pr-md-20
          PageArrow(isNext=false)
          each item, index in this.pages
            if (this.showAll(index))
              PageItem(key=index classes=this.getItemClasses(index) link=index clickHandle=this.itemHandle(index))= item
          PageArrow(isNext=true)

        //- .col-auto.pl-2.pr-0.page-status Страница #{this.pages[current]} из #{count}
        .col-auto.pl-2.page-status Страница #{this.pages[current]} из #{count}
    `;
  }
}
