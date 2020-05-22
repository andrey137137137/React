import React, { Component, Fragment } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import SvgCmp from "@cmp/SvgCmp";
import { getComputedClasses } from "@help/classes";

export default
@observer
class CardImg extends Component {
  @computed get img() {
    return "img/today/" + this.props.img + ".jpg";
  }
  @computed get classes() {
    const { status } = this.props.item;

    return getComputedClasses(
      [
        { cond: status < 4, value: "card-rating--danger" },
        { cond: status < 7, value: "card-rating--warning" }
      ],
      "card-rating--success"
    );
  }

  render() {
    return pug`
      Fragment
        .card-row_elem.card-tab 3d
        .card-img_wrap
          img.card-img(src=this.img, alt=this.props.item.title)
        .icon.card-img_icon.card-rating(className=this.classes)
          //- .icon-symbol_wrap.card-img_icon_bg.card-rating_bg
          //-   SvgCmp(icon="star-smooth" classes="icon-symbol")
          .icon-symbol_wrap.card-img_icon_bg.card-rating_star
            SvgCmp(icon="star" classes="icon-symbol")
          span.icon-symbol_wrap.card-rating_text= this.props.item.status
        if this.props.item.status > 9
          .icon.card-img_icon.card-review
            //- .icon-symbol_wrap.card-img_icon_bg.card-review_bg
            //-   SvgCmp(icon="stamp-glow" classes="icon-symbol")
            .icon-symbol_wrap.card-review_icon
              SvgCmp(icon="stamp" classes="icon-symbol")
    `;
  }
}
