import React, { Component, Fragment } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import SvgCmp from "@cmp/SvgCmp";
import { getComputedClasses } from "@help/classes";

const { count, current } = store.pagination;

const getItemClasses = (index, hiddenClasses = false) => {
  const classes = hiddenClasses ? [hiddenClasses] : [];

  return getComputedClasses([
    ...classes,
    { cond: index == current, value: "active" }
  ]);
};

const PageItem = props => pug`
  li.page-item(className=props.classes)
    //- a.page-link(href="" class={"ml-6": index == count - 1})
    a.page-link(href=props.link)= props.children
`;

const PageIcon = props => (
  // span.icon.page-text.page-icon(class="icon-" + icon)
  <SvgCmp
    icon="angle"
    classes={"icon icon-" + props.icon + " page-text page-icon"}
  />
);

const PageText = props => (
  <span className="d-none d-md-block page-text"> {props.value} </span>
);

const PageArrow = props => pug`
  if !props.isNext
    if current > 2
      PageItem(classes="page-item--back" link=current - 2)
        PageIcon(icon="angle_left")
        PageText(value="Предыдущая")
    else
      PageItem(classes=getItemClasses(0) link=0) 1
  else
    if current < count - 3
      PageItem(classes="page-item--next" link=current + 2)
        PageText(value="Следующая")
        PageIcon(icon="angle_right")
    else
      PageItem(classes=getItemClasses(count - 1) link=count - 1)= count
`;

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
  @action getItemClass(index) {
    // const hiddenCond =
    //   this.isArrows && (index == current - 1 || index == current + 1);
    const hiddenCond = index == current - 1 || index == current + 1;

    return getItemClasses(index, {
      cond: hiddenCond,
      value: "d-none d-md-block"
    });
  }

  render() {
    return pug`
      Fragment
        ul.col-auto.pagination.mb-6.pr-19.pr-md-20
          PageArrow(isNext=false)
          each item, index in this.pages
            if (this.showAll(index))
              PageItem(key=index classes=this.getItemClass(index) link=index)= item
          PageArrow(isNext=true)

        //- .col-auto.pl-2.pr-0.page-status Страница #{this.pages[current]} из #{count}
        .col-auto.pl-2.page-status Страница #{this.pages[current]} из #{count}
    `;
  }
}
