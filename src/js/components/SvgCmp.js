import React, { Component } from "react";

export default SvgCmp = props => pug`
  svg(className=this.props.classes)
    use(xlinkHref="#" + props.icon)
`;
