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

    props.data.map((item, index) => {
      const { category, value } = item;

      if (category == "result") {
        const { positive, negative } = value;

        grades.result.positive = number2str(positive);
        grades.result.negative = number2str(negative);

        grades.result.iconClasses = getComputedClasses(
          [{ cond: positive > 6, value: iconClasses.success }],
          iconClasses.warning,
          iconClasses.common
        );
      } else {
        const successCond = value < 3;

        grades[category].iconClasses = getComputedClasses(
          [
            { cond: successCond, value: iconClasses.success },
            { cond: value < 8, value: iconClasses.warning }
          ],
          iconClasses.danger,
          iconClasses.common
        );

        switch (category) {
          case "alcohol":
          case "toiletHumor":
          case "violence":
            if (successCond) {
              grades[category].value = "Нет";
            } else {
              grades[category].value = "Есть";
            }
            break;
          default:
            grades[category].value = value;
        }
      }
    });

    this.state = {
      grades
    };
  }

  render() {
    return pug`
        ul.list-group.list-group-horizontal.card-categories
          each item, index in this.props.data
            li.list-group-item.card-list_item.card-categories_item(key=item.category)
              SvgCmp(icon=this.state.grades[item.category].icon classes=this.state.grades[item.category].iconClasses)
              if item.category == "result"
                span.card-categories_text
                  span.text-success= this.state.grades[item.category].positive
                  | /
                  span.text-danger= this.state.grades[item.category].negative
              else
                span.card-categories_text= this.state.grades[item.category].value
      `;
  }
}
