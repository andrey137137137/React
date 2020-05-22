import React, { Component } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import CardTitleText from "@cardCmp/CardTitleText";
import SvgCmp from "@cmp/SvgCmp";

export default
@observer
class CardTitle extends Component {
  @computed get classes() {
    return getSwitchedClass(this.props.marked, "icon--success");
  }

  render() {
    return pug`
      h3.col-auto.section-title.card-title
        //- span.position-relative
        span.card-title_row
          span.card-title_stopper
          CardTitleText(text=this.props.title)
          //- CardTitleText(text="Король лев")
          span.icon.icon--round.card-row_elem.card-row_elem--d_inline_block.card-title_mark(className=this.classes)
            span.icon-bg
            span.icon-symbol_wrap
              SvgCmp(icon="bookmark" classes="icon-symbol")
        span.d-md-none.card-row_elem.card-title_translate The Lion King
        span.card-text_gradient_hidden.card-title_gradient_hidden
    `;
  }
}
