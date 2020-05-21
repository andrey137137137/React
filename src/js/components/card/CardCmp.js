import React, { Component } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";
import CardImg from "@cardCmp/CardImg";
import { getComputedClasses } from "@help/classes";

export default
@observer
class CardCmp extends Component {
  @computed get classes() {
    // const common = "card";

    // if (this.props.store.byRows) return common + " section-pill card--row";

    // return common + " col card--block";

    return getComputedClasses(
      "card",
      { cond: this.props.store.byRows, value: "section-pill card--row" },
      "col card--block"
    );
  }

  render() {
    return (
      <article className={classes}>
        <div className="card-body">
          <div className="row no-gutters align-items-start">
            <div className="col-auto card-img_cover">
              <CardImg img={this.img} item={this.props.item} />
            </div>
            <div className="col card-text_wrap">
              <div className="row no-gutters card-title_wrap">
                <Cardtitle
                  title={this.props.item.title}
                  marked={this.props.item.marked}
                />
                <div className="col-auto card-info_wrap">
                  <Cardinfo items={this.props.item.statistics} />
                </div>
              </div>
              <div className="row no-gutters align-items-end">
                <div className="col card-categories_wrap">
                  <Cardsubtitle options={this.props.item} />
                  <Cardcategories items={this.props.item.reviews} />
                  <Cardshorttext category={this.props.item.category} />
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
          <Cardinfo items={this.props.item.statistics} />
        </div>
      </article>
    );
  }
}
