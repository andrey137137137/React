import React, { Component } from "react";
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

    // const common = "icon card-img_icon card-rating";

    // if (status < 4) return common + " card-rating--danger";
    // if (status < 7) return common + " card-rating--warning";

    // return common + " card-rating--success";

    return getComputedClasses(
      "icon card-img_icon card-rating",
      { cond: status < 4, value: "card-rating--danger" },
      { cond: status < 7, value: "card-rating--warning" },
      "card-rating--success"
    );
  }

  render() {
    return (
      <>
        <div className="card-row_elem card-tab">3d</div>
        <div className="card-img_wrap">
          <img
            className="card-img"
            src={this.img}
            alt={this.props.item.title}
          />
        </div>
        <div className={this.classes}>
          <div className="icon-symbol_wrap card-img_icon_bg card-rating_star">
            <SvgCmp icon="star" classes="icon-symbol" />
          </div>
          <span className="icon-symbol_wrap card-rating_text">
            {this.props.item.status}
          </span>
        </div>
        {() => {
          if (this.props.item.status > 9) {
            return (
              <div className="icon card-img_icon card-review">
                <div className="icon-symbol_wrap card-review_icon">
                  <SvgCmp icon="stamp" classes="icon-symbol" />
                </div>
              </div>
            );
          }
        }}
      </>
    );
  }
}
