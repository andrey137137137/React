// import React, { Component } from "react";
import CardSubtitleText from "@cardCmp/CardSubtitleText";

export default function CardSubtitle(props) {
  return pug`
    h4.card-subtitle
      CardSubtitleText(text="2019, Боевик, драма, биография")
      //- CardSubtitleText(text=props.options.date + ", " + props.options.genre)
      //- CardSubtitleText(text=props.options.translate)
      span.badge.card-row_elem.card-row_elem--d_inline_block.card-subtitle_badge.order-md-first 16+
      span.card-text_gradient_hidden.card-subtitle_gradient_hidden
  `;
}
