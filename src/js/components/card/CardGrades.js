import React, { Component } from "react";
import SvgCmp from "@cmp/SvgCmp";
import { getComputedClasses } from "@help/classes";
import { number2str } from "@help/converters";

export default class CardGrades extends Component {
  constructor(props) {
    super(props);

    const iconClasses = {
      common: "icon card-categories_icon",
      success: "icon--success",
      warning: "icon--warning",
      danger: "icon--danger"
    };
    const grades = {
      result: {
        icon: "libra-square",
        positive: 0,
        negative: 0,
        iconClasses: ""
      },
      entertaiment: {
        icon: "cup-square",
        value: 0,
        iconClasses: ""
      },
      alcohol: {
        icon: "bottle-square",
        value: "",
        iconClasses: ""
      },
      erotica: {
        icon: "strawberry-square",
        value: "",
        iconClasses: ""
      },
      toiletHumor: {
        icon: "toilet-paper-square",
        value: "",
        iconClasses: ""
      },
      violence: {
        icon: "knuckle-square",
        value: 0,
        iconClasses: ""
      },
      harmfulPropaganda: {
        icon: "bullhorn-square",
        value: 0,
        iconClasses: ""
      }
    };

    for (const key in props) {
      if (props.hasOwnProperty(key)) {
        if (key == "result") {
          const { positive } = props.result;

          grades.result.positive = number2str(positive);
          grades.result.negative = number2str(props.result.negative);

          grades[key].iconClasses = getComputedClasses(
            [{ cond: positive > 6, value: iconClasses.success }],
            iconClasses.warning,
            iconClasses.common
          );
        } else {
          const { value } = props[key];
          const successCond = value < 3;

          grades[key].iconClasses = getComputedClasses(
            [
              { cond: successCond, value: iconClasses.success },
              { cond: value < 8, value: iconClasses.warning },
              { cond: value >= 8, value: iconClasses.danger }
            ],
            "",
            iconClasses.common
          );

          switch (key) {
            case "alcohol":
            case "toiletHumor":
            case "violence":
              if (successCond) grades[key].value = "Нет";
              else grades[key].value = "Есть";
              break;
            default:
              grades[key].value = props[key];
          }
        }
      }
    }

    this.state = {
      grades
    };
  }

  render() {
    return pug`
        ul.list-group.list-group-horizontal.card-categories
          each item, index in props.items
            li.list-group-item.card-list_item.card-categories_item
              if index > 0
                if item < 3
                  - categoryItem.success = true
                else if item < 8
                  - categoryItem.warning = true
                else
                  - categoryItem.danger = true
                if index > 1 && index < 5
                  if item < 3
                    - categoryItem.value = "Нет"
                  else
                    - categoryItem.value = "Есть"
                else
                  - categoryItem.value = item
              case index
                when 0
                  - categoryItem.icon = "libra-square"
                  if item.positive == "6,2"
                    - categoryItem.success = true
                  else
                    - categoryItem.warning = true
                when 1
                  - categoryItem.icon = "cup-square"
                when 2
                  - categoryItem.icon = "bottle-square"
                when 3
                  - categoryItem.icon = "strawberry-square"
                when 4
                  - categoryItem.icon = "toilet-paper-square"
                when 5
                  - categoryItem.icon = "knuckle-square"
                when 6
                  - categoryItem.icon = "bullhorn-square"
              SvgCmp(icon=categoryItem.icon classes={"icon": true, "card-categories_icon": true, "icon--success": categoryItem.success, "icon--warning": categoryItem.warning, "icon--danger": categoryItem.danger})
              case index
                when 0
                  span.card-categories_text
                    span.text-success= item.positive
                    | /
                    span.text-danger= item.negative
                default
                  span.card-categories_text= categoryItem.value
      `;
  }
}
