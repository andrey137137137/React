// import React, { Component } from "react";

export default function CardSubtitleText(props) {
  return pug`
    span.card-text_span= props.text
  `;
}
