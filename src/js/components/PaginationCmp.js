import React, { Component, Fragment } from "react";
import { observable, action } from "mobx";
import { observer } from "mobx-react";
import SvgCmp from "@cmp/SvgCmp";
import { getComputedClasses } from "@help/classes";

export default
@observer
class PaginationCmp extends Component {
  @observable len = 7;

  @action getIconElem(icon) {
    return (
      // span.icon.page-text.page-icon(class="icon-" + icon)
      SvgCmp(
        (icon = "angle"),
        (className = "icon icon-" + icon + " page-text page-icon")
      )
    );
  }
  @action getTextElem(value) {
    return <span className="d-none d-md-block page-text"> {value} </span>;
  }
  @action getItemClass(index) {
    const hiddenCond = index == 4 || index == len - 2;

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
          - for (var i = 0; i < len; i++)
          
            li.page-item(className=this.getItemClass(index))
              //- a.page-link(href="" class={"ml-6": index == len - 1})
              a.page-link(href="")
                case index
                  when 0
                    this.getIconElem("angle_left")
                    this.getTextElem("Предыдущая")
                  when len - 1
                    this.getTextElem("Следующая")
                    this.getIconElem("angle_right")
                  default
                    | #{index}
          
        //- .col-auto.pl-2.pr-0.page-status Страница 3 из 7
        .col-auto.pl-2.page-status Страница 3 из 7
    `;
  }
}
