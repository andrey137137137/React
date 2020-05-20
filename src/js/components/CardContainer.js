import React, { Component } from "react";
import { computed } from "mobx";
import { observer } from "mobx-react";

export default
@observer
class CardContainer extends Component {
  @computed get classes() {
    const common = "row section-body";

    if (this.props.store.byRows) {
      // return common + " main-container--rows"
      return common + " p-0";
    }

    // return common + " main-container--blocks"
    return common + " section-pill";
  }
  render() {
    return <div className={this.classes}> {this.props.children} </div>;
  }
}
