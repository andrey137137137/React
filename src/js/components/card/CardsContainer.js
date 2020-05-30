import React, { Component } from "react";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import store from "@store";
import CardCmp from "@cardCmp/CardCmp";
import { getComputedClasses } from "@help/classes";

@observer
export default class CardsContainer extends Component {
  @observable items = [
    {
      title: "Бесконечно белый медведь",
      translate: "Infinitely polar bear",
      date: 2015,
      genre: "комедия",
      status: 9.3,
      text:
        "2015, Фильм, 106 мин. Боевик, драма, биография Китай, США, Канада Режисёр: Джеймс Кэмерон",
      category: "Топ 100 лучших фильмов",
      marked: false,
      statistics: {
        stars: 392,
        reviews: 47,
        comments: 578
      },
      reviews: [
        { category: "result", value: { positive: 6.2, negative: 3.8 } },
        { category: "entertaiment", value: 7 },
        { category: "alcohol", value: 10 },
        { category: "erotica", value: 0 },
        { category: "toiletHumor", value: 10 },
        { category: "violence", value: 2 },
        { category: "harmfulPropaganda", value: 2 }
      ]
    },
    {
      //- title: "Путешествие из Парижа",
      title:
        "Кто такой Гарри gh Келлерман и почему он говорит обо мне ужасные вещи?",
      translate:
        "Who Is Harry Kellerman and Why Is He Saying Those Terrible Things About Me?",
      date: 2015,
      genre: "комедия",
      status: 5.8,
      text:
        "2011, Фильм, 120 мин. Драма, военный Великобритания, Франция Режисёр: Стивен Спилберг",
      category: "",
      //- category: "Топ 100 лучших фильмов",
      marked: true,
      statistics: {
        stars: 105,
        reviews: 6,
        comments: 57
      },
      reviews: [
        { category: "result", value: { positive: 4.7, negative: 5.3 } },
        { category: "entertaiment", value: 7 },
        { category: "alcohol", value: 10 },
        { category: "erotica", value: 5 },
        { category: "toiletHumor", value: 0 },
        { category: "violence", value: 5 },
        { category: "harmfulPropaganda", value: 9 }
      ]
    },
    {
      //- title: "Побудь в моей шкуре",
      title:
        "Кто такой Гарри ghjk Келлерман и почему он говорит обо мне ужасные вещи?",
      translate:
        "Who Is Harry Kellerman and Why Is He Saying Those Terrible Things About Me?",
      date: 2014,
      genre: "фантастика",
      status: 2.4,
      text: "",
      category: "Топ 100 лучших фильмов",
      marked: false,
      statistics: {
        stars: 392,
        reviews: 47,
        comments: 578
      },
      reviews: [
        { category: "result", value: { positive: 6.2, negative: 3.8 } },
        { category: "entertaiment", value: 7 },
        { category: "alcohol", value: 10 },
        { category: "erotica", value: 0 },
        { category: "toiletHumor", value: 10 },
        { category: "violence", value: 2 },
        { category: "harmfulPropaganda", value: 2 }
      ]
    },
    {
      title: "Матрос Железняк",
      translate: "Infinitely polar bear",
      date: 1985,
      genre: "драма",
      status: 9.3,
      text: "",
      category: "Топ 100 лучших фильмов",
      marked: false,
      statistics: {
        stars: 105,
        reviews: 6,
        comments: 57
      },
      reviews: [
        { category: "result", value: { positive: 4.7, negative: 5.3 } },
        { category: "entertaiment", value: 7 },
        { category: "alcohol", value: 10 },
        { category: "erotica", value: 5 },
        { category: "toiletHumor", value: 0 },
        { category: "violence", value: 5 },
        { category: "harmfulPropaganda", value: 9 }
      ]
    },
    {
      title: "Сила воли",
      translate: "Infinitely polar bear",
      date: 2016,
      genre: "драма",
      status: 5.8,
      text: "",
      category: "Топ 100 лучших фильмов",
      marked: false,
      statistics: {
        stars: 392,
        reviews: 47,
        comments: 578
      },
      reviews: [
        { category: "result", value: { positive: 6.2, negative: 3.8 } },
        { category: "entertaiment", value: 7 },
        { category: "alcohol", value: 10 },
        { category: "erotica", value: 0 },
        { category: "toiletHumor", value: 10 },
        { category: "violence", value: 2 },
        { category: "harmfulPropaganda", value: 2 }
      ]
    }
  ];

  @computed get classes() {
    // return getComputedClasses(
    //   { cond: store.byRows, value: "main-container--rows" },
    //   "main-container--blocks"
    // );
    return getComputedClasses(
      [{ cond: store.byRows, value: "p-0" }],
      "section-pill"
    );
  }

  render() {
    return pug`
      .row.section-body(className=this.classes)
        each item, index in this.items
          CardCmp(key=index img=(index + 1) item=this.items[index])
    `;
  }
}
