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
    return (
      <article className={this.classes}>
        <div className="card-body">
          <div className="row no-gutters align-items-start">
            <div className="col-auto card-img_cover">
              <CardImg img={this.props.img} item={this.props.item} />
            </div>
            <div className="col card-text_wrap">
              <div className="row no-gutters card-title_wrap">
                <CardTitle
                  title={this.props.item.title}
                  marked={this.props.item.marked}
                />
                <div className="col-auto card-info_wrap">
                  <CardInfo data={this.props.item.statistics} />
                </div>
              </div>
              <div className="row no-gutters align-items-end">
                <div className="col card-categories_wrap">
                  <CardSubtitle options={this.props.item} />
                  <CardGrades data={this.props.item.reviews} />
                  <CardShortText text={this.props.item.category} />
                </div>
                <p className="col-auto card-desc">{this.props.item.text}</p>
              </div>
            </div>
          </div>
          <a className="btn btn-link d-md-none card-row_elem card-link" href="">
            Подробнее...
          </a>
        </div>
        <div className="d-md-none card-row_elem card-footer">
          <CardInfo data={this.props.item.statistics} />
        </div>
      </article>
    );
  }
}
