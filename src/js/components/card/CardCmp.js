import React, { Component } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import CardImg from "@cardCmp/CardImg";
import CardTitle from "@cardCmp/CardTitle";
import CardInfo from "@cardCmp/CardInfo";
import CardSubtitle from "@cardCmp/CardSubtitle";
import CardGrades from "@cardCmp/CardGrades";
import CardShortText from "@cardCmp/CardShortText";
import { getComputedClasses } from "@help/classes";

export default
@observer
class CardCmp extends Component {
  @computed get classes() {
    return getComputedClasses(
      [{ cond: this.props.store.byRows, value: "section-pill card--row" }],
      "col card--block",
      "card"
    );
  }

  render() {
    return pug`
      article.card(className=this.classes)
        .card-body
          .row.no-gutters.align-items-start
            .col-auto.card-img_cover
              CardImg(img=this.props.img, data=this.props.item)
              //- CardImg(img=this.props.img)
              //- CardImg
            .col.card-text_wrap
              //- .row.no-gutters.align-items-start
              .row.no-gutters.card-title_wrap
                CardTitle(title=this.props.item.title, marked=this.props.item.marked)
                //- CardTitle
                .col-auto.card-info_wrap
                  CardInfo(data=this.props.item.statistics)
                  //- CardInfo
                //- .w-100.card-separator
                //- .col
              .row.no-gutters.align-items-end
                .col.card-categories_wrap
                  CardSubtitle(data=this.props.item)
                  //- CardSubtitle
                  CardGrades(data=this.props.item.reviews)
                  //- CardGrades
                  //- CardShortText(text="Фильм, 120 мин. Великобритания")
                  CardShortText(text=this.props.item.category)
                  //- CardShortText
                p.col-auto.card-desc= this.props.item.text
          a.btn.btn-link.d-md-none.card-row_elem.card-link(href="") Подробнее...
        .d-md-none.card-row_elem.card-footer
          CardInfo(data=this.props.item.statistics)
          //- CardInfo  
    `;
  }
}
