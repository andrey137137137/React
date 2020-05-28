import React, { Component, Fragment } from "react";
import { observable, computed, action } from "mobx";
import { observer } from "mobx-react";
import SvgCmp from "@cmp/SvgCmp";
import { getComputedClasses } from "@help/classes";

const PageIconCmp = props => (
  // span.icon.page-text.page-icon(class="icon-" + icon)
  <SvgCmp
    icon="angle"
    classes={"icon icon-" + props.icon + " page-text page-icon"}
  />
);

const PageTextCmp = props => (
  <span className="d-none d-md-block page-text"> {props.value} </span>
);

export default
@observer
class PaginationCmp extends Component {
  @observable count = 7;

  @computed get pages() {
    const array = [];

    for (let i = 0; i < this.count; i++) {
      array.push(i + 1);
    }

    return array;
  }

  @action getItemClass(index) {
    const hiddenCond = index == 4 || index == this.count - 2;

    return getComputedClasses([
      { cond: hiddenCond, value: "d-none" },
      { cond: hiddenCond, value: "d-md-block" },
      { cond: index == 3, value: "active" }
    ]);
  }
  render() {
    return pug`
      Fragment
        ul.col-auto.pagination.mb-6.pr-19.pr-md-20
          each item, index in this.pages
            li.page-item(key=index className=this.getItemClass(index))
              //- a.page-link(href="" class={"ml-6": index == this.count - 1})
              a.page-link(href="")
                case index
                  when 0
                    PageIconCmp(icon="angle_left")
                    PageTextCmp(value="Предыдущая")
                  when this.count - 1
                    PageTextCmp(value="Следующая")
                    PageIconCmp(icon="angle_right")
                  default
                    | #{index}

        //- .col-auto.pl-2.pr-0.page-status Страница 3 из 7
        .col-auto.pl-2.page-status Страница 3 из 7
    `;
  }
}
