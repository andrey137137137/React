import { observable } from "mobx";

export default observable({
  showFilter: false,
  byRows: true,
  pagination: { current: 6, count: 7 }
});
