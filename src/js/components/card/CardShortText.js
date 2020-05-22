// import React, { Component } from "react";

export default function CardShortText(props) {
  return pug`
    p.card-row_elem.card-short_text= props.text
  `;
}
