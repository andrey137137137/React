import React, { Component } from "react";
import SvgCmp from "@cmp/SvgCmp";

export default class CardInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconClasses: "card-icon card-info_icon",
      items: [
        {
          key: "stars",
          modif: "card-info_item--stars",
          icon: "star-empty",
          iconModif: ""
        },
        {
          key: "reviews",
          modif: "card-info_item--reviews",
          icon: "layer-group",
          iconModif: "card-info_icon--review"
        },
        {
          key: "comments",
          modif: "card-info_item--comments",
          icon: "comment",
          iconModif: "card-info_icon--comment"
        }
      ]
    };
  }

  getIconClasses(index) {
    const common = this.state.iconClasses;
    const { iconModif } = this.state.items[index];

    if (iconModif) return `${common} ${iconModif}`;

    return common;
  }

  render() {
    return pug`
      ul.list-group.list-group-horizontal.card-info
        each item, index in this.state.items
          li.list-group-item.card-list_item.card-info_item(key=item.key className=item.modif)
            SvgCmp(icon=item.icon, classes=this.getIconClasses(index))
            span.card-info_number= this.props.data[item.key]
    `;
  }
}
