// import React, { Component } from "react";

export default function CardTitleText(props) {
  return pug`
    span.card-text_span.card-title_text= props.text
  `;
}
